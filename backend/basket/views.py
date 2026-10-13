import logging

from decimal import Decimal, InvalidOperation

from django.db import transaction
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Customer, Order, OrderItem
from .serializers import OrderSerializer

from products.model.Product_model import Product
from friday_bazaar.models import FridayBazaarItem


logger = logging.getLogger(__name__)


# =========================================================
# CREATE ORDER
# =========================================================

class CreateOrderView(APIView):

    @transaction.atomic
    def post(self, request):

        data = request.data

        customer_data = data.get("customer") or {}
        items_data = data.get("items", [])

        shipping_method = data.get(
            "shipping_method",
            "normal"
        )

        payment_method = data.get(
            "payment_method",
            "cod"
        )

        # -------------------------------------------------
        # Validate Customer
        # -------------------------------------------------

        if not isinstance(customer_data, dict):
            return Response(
                {"detail": "Invalid customer information."},
                status=status.HTTP_400_BAD_REQUEST
            )

        full_name = customer_data.get("name")
        phone = customer_data.get("phone")
        province = customer_data.get("province")
        city = customer_data.get("city")
        address = customer_data.get("address")
        notes = customer_data.get("notes", "")

        required_fields = {
            "name": full_name,
            "phone": phone,
            "province": province,
            "city": city,
            "address": address,
        }

        for field, value in required_fields.items():
            if not value or not str(value).strip():
                return Response(
                    {
                        "detail": f"{field} is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # -------------------------------------------------
        # Validate Items
        # -------------------------------------------------

        if not isinstance(items_data, list) or not items_data:
            return Response(
                {"detail": "Your cart is empty or invalid."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # Validate Shipping
        # -------------------------------------------------

        shipping_costs = {
            "kabul": Decimal("100"),
            "province": Decimal("200"),
            "normal": Decimal("0"),
            "express": Decimal("100"),
            "pickup": Decimal("0"),
        }

        if shipping_method not in shipping_costs:
            return Response(
                {"detail": "Invalid shipping method."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # Validate Payment
        # -------------------------------------------------

        allowed_payment_methods = {
            choice[0]
            for choice in Order.PAYMENT_METHODS
        }

        if payment_method not in allowed_payment_methods:
            return Response(
                {"detail": "Invalid payment method."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # Validate Item Input Before Creating Order
        # -------------------------------------------------

        validated_items = []

        for item in items_data:

            if not isinstance(item, dict):
                return Response(
                    {"detail": "Invalid order item."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            product_id = item.get("product_id")
            quantity_value = item.get("quantity")

            if product_id is None:
                return Response(
                    {"detail": "Product ID is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                product_id = int(product_id)
                quantity_decimal = Decimal(str(quantity_value))

                if not quantity_decimal.is_finite():
                    raise ValueError

                if quantity_decimal != quantity_decimal.to_integral_value():
                    raise ValueError

                quantity = int(quantity_decimal)

            except (TypeError, ValueError, InvalidOperation):
                return Response(
                    {"detail": "Invalid product ID or quantity."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if product_id <= 0:
                return Response(
                    {"detail": "Invalid product ID."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:
                return Response(
                    {
                        "detail": (
                            "Quantity must be greater than zero."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            friday_item_id = item.get("friday_bazaar_item_id")

            if friday_item_id not in (None, ""):
                try:
                    friday_item_id = int(friday_item_id)
                except (TypeError, ValueError):
                    return Response(
                        {
                            "detail": (
                                "Invalid Friday Bazaar item ID."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if friday_item_id <= 0:
                    return Response(
                        {
                            "detail": (
                                "Invalid Friday Bazaar item ID."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                friday_item_id = None

            validated_items.append({
                "product_id": product_id,
                "quantity": quantity,
                "friday_bazaar_item_id": friday_item_id,
            })

        # -------------------------------------------------
        # Get/Create Customer
        # -------------------------------------------------

        if request.user.is_authenticated:

            customer, created = Customer.objects.get_or_create(
                user=request.user,
                defaults={
                    "full_name": full_name,
                    "phone": phone,
                    "province": province,
                    "city": city,
                    "address": address,
                }
            )

            if not created:
                customer.full_name = full_name
                customer.phone = phone
                customer.province = province
                customer.city = city
                customer.address = address

                customer.save(
                    update_fields=[
                        "full_name",
                        "phone",
                        "province",
                        "city",
                        "address",
                        "updated_at",
                    ]
                )

        else:
            customer = Customer.objects.create(
                full_name=full_name,
                phone=phone,
                province=province,
                city=city,
                address=address,
            )

        # -------------------------------------------------
        # Create Order
        # -------------------------------------------------

        order = Order.objects.create(
            customer=customer,
            shipping_method=shipping_method,
            payment_method=payment_method,
            notes=notes,
        )

        subtotal = Decimal("0")

        # -------------------------------------------------
        # Process Order Items
        # -------------------------------------------------

        for item in validated_items:

            product_id = item["product_id"]
            quantity = item["quantity"]
            friday_item_id = item["friday_bazaar_item_id"]

            # Lock product row
            try:
                product = (
                    Product.objects
                    .select_for_update()
                    .get(
                        id=product_id,
                        is_active=True,
                    )
                )

            except Product.DoesNotExist:
                transaction.set_rollback(True)

                return Response(
                    {
                        "detail": (
                            f"Product {product_id} does not exist "
                            "or is inactive."
                        )
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            # ---------------------------------------------
            # Friday Bazaar Item
            # ---------------------------------------------

            if friday_item_id is not None:

                now = timezone.now()

                # Log the received IDs and existing campaign item.
                logger.warning(
                    "Friday Bazaar checkout: product_id=%s, "
                    "friday_item_id=%s",
                    product_id,
                    friday_item_id,
                )

                # First check whether this campaign item exists
                # and belongs to the requested product.
                try:
                    friday_item = (
                        FridayBazaarItem.objects
                        .select_for_update()
                        .get(
                            id=friday_item_id,
                            product_id=product.id,
                        )
                    )

                except FridayBazaarItem.DoesNotExist:

                    logger.warning(
                        "Friday Bazaar item not found or product "
                        "mismatch: item_id=%s, product_id=%s",
                        friday_item_id,
                        product.id,
                    )

                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                "The Friday Bazaar item does not "
                                "belong to this product or does "
                                "not exist."
                            ),
                            "product_id": product.id,
                            "friday_bazaar_item_id": friday_item_id,
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Check campaign availability separately so that
                # the actual reason can be identified.
                if not friday_item.is_active:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                "This Friday Bazaar item is inactive."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                campaign = friday_item.campaign

                if not campaign.is_active:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                "The Friday Bazaar campaign is inactive."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if not (
                    campaign.start_date <= now < campaign.end_date
                ):
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                "The Friday Bazaar campaign is "
                                "outside its scheduled time."
                            ),
                            "campaign_start": campaign.start_date,
                            "campaign_end": campaign.end_date,
                            "server_time": now,
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if not product.is_active:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": "This product is inactive."
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Check campaign stock
                available_campaign_stock = max(
                    friday_item.stock_limit - friday_item.sold_count,
                    0,
                )

                if available_campaign_stock < quantity:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                "Not enough Friday Bazaar stock."
                            ),
                            "available_stock": available_campaign_stock,
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Check main product stock
                if product.stock < quantity:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                f"Not enough stock for "
                                f"{product.product_name}."
                            ),
                            "available_stock": product.stock,
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Always use the campaign price from the database.
                current_price = friday_item.campaign_price

                # Increase campaign sold count.
                friday_item.sold_count += quantity

                friday_item.save(
                    update_fields=["sold_count"]
                )

            # ---------------------------------------------
            # Normal Product
            # ---------------------------------------------

            else:

                if product.stock < quantity:
                    transaction.set_rollback(True)

                    return Response(
                        {
                            "detail": (
                                f"Not enough stock for "
                                f"{product.product_name}."
                            ),
                            "available_stock": product.stock,
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if (
                    product.discount_price is not None
                    and product.discount_price < product.price
                ):
                    current_price = product.discount_price
                else:
                    current_price = product.price

            # ---------------------------------------------
            # Calculate and Create Order Item
            # ---------------------------------------------

            item_subtotal = current_price * quantity

            subtotal += item_subtotal

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.product_name,
                quantity=quantity,
                price=current_price,
                subtotal=item_subtotal,
            )

            # ---------------------------------------------
            # Update Product Stock
            # ---------------------------------------------

            product.stock -= quantity
            product.sales_count += quantity

            product.save(
                update_fields=[
                    "stock",
                    "sales_count",
                ]
            )

        # -------------------------------------------------
        # Calculate Totals
        # -------------------------------------------------

        shipping_cost = shipping_costs[shipping_method]
        total = subtotal + shipping_cost

        order.subtotal = subtotal
        order.shipping_cost = shipping_cost
        order.total = total

        order.save(
            update_fields=[
                "subtotal",
                "shipping_cost",
                "total",
                "updated_at",
            ]
        )

        # -------------------------------------------------
        # Response
        # -------------------------------------------------

        serializer = OrderSerializer(order)

        return Response(
            {
                "message": "Order created successfully.",
                "order": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )


# =========================================================
# ORDER SUCCESS
# =========================================================

class OrderSuccessView(APIView):

    def get(self, request, order_number):

        try:
            order = (
                Order.objects
                .select_related("customer")
                .prefetch_related("items")
                .get(order_number=order_number)
            )

        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


# =========================================================
# ORDER TRACKING
# =========================================================

class OrderTrackingView(APIView):

    def get(self, request, order_number):

        phone = request.query_params.get("phone")

        if not phone:
            return Response(
                {"detail": "Phone number is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order = (
                Order.objects
                .select_related("customer")
                .prefetch_related("items")
                .get(
                    order_number=order_number,
                    customer__phone=phone,
                )
            )

        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )