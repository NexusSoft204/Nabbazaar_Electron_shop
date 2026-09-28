from django.db import transaction
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Customer,
    Order,
    OrderItem,
)

from .serializers import (
    OrderSerializer,
)

from products.model.Product_model import Product


# =========================================================
# CREATE ORDER
# =========================================================

class CreateOrderView(APIView):

    @transaction.atomic
    def post(self, request):

        data = request.data

        customer_data = data.get("customer", {})
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

        full_name = customer_data.get("name")
        phone = customer_data.get("phone")
        province = customer_data.get("province")
        city = customer_data.get("city")
        address = customer_data.get("address")
        notes = customer_data.get("notes", "")

        if not full_name:
            return Response(
                {
                    "detail": "Customer name is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not phone:
            return Response(
                {
                    "detail": "Phone number is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not province:
            return Response(
                {
                    "detail": "Province is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not city:
            return Response(
                {
                    "detail": "City is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not address:
            return Response(
                {
                    "detail": "Address is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # Validate Items
        # -------------------------------------------------

        if not items_data:
            return Response(
                {
                    "detail": "Your cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # -------------------------------------------------
        # Get/Create Customer
        # -------------------------------------------------

        customer = None

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

                customer.save()

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

        subtotal = 0

        # -------------------------------------------------
        # Create Order Items
        # -------------------------------------------------

        for item in items_data:

            product_id = item.get("product_id")
            quantity = int(item.get("quantity", 0))

            if not product_id:
                transaction.set_rollback(True)

                return Response(
                    {
                        "detail": "Product ID is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:
                transaction.set_rollback(True)

                return Response(
                    {
                        "detail": "Quantity must be greater than zero."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ---------------------------------------------
            # Lock product row
            # ---------------------------------------------

            try:

                product = (
                    Product.objects
                    .select_for_update()
                    .get(
                        id=product_id,
                        is_active=True
                    )
                )

            except Product.DoesNotExist:

                transaction.set_rollback(True)

                return Response(
                    {
                        "detail": f"Product {product_id} does not exist."
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            # ---------------------------------------------
            # Check Stock
            # ---------------------------------------------

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

            # ---------------------------------------------
            # Determine Price
            # ---------------------------------------------

            if (
                product.discount_price is not None
                and product.discount_price < product.price
            ):
                current_price = product.discount_price

            else:
                current_price = product.price

            # ---------------------------------------------
            # Calculate Item Subtotal
            # ---------------------------------------------

            item_subtotal = current_price * quantity

            subtotal += item_subtotal

            # ---------------------------------------------
            # Create Order Item
            # ---------------------------------------------

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.product_name,
                quantity=quantity,
                price=current_price,
                subtotal=item_subtotal,
            )

            # ---------------------------------------------
            # Decrease Stock
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
        # Shipping Cost
        # -------------------------------------------------

        shipping_cost = 0

        if shipping_method == "express":

            shipping_cost = 100

        elif shipping_method == "normal":

            shipping_cost = 0

        elif shipping_method == "pickup":

            shipping_cost = 0

        # -------------------------------------------------
        # Final Total
        # -------------------------------------------------

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
                .get(
                    order_number=order_number
                )
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail": "Order not found."
                },
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

        # بررسی شماره تماس
        if not phone:
            return Response(
                {
                    "detail": "Phone number is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            order = (
                Order.objects
                .select_related("customer")
                .prefetch_related("items")
                .get(
                    order_number=order_number,
                    customer__phone=phone
                )
            )

        except Order.DoesNotExist:
            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # برگرداندن اطلاعات سفارش
        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )