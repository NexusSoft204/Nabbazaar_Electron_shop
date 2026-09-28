from rest_framework import serializers

from .models import (
    Customer,
    Order,
    OrderItem,
)


# =========================================================
# CUSTOMER SERIALIZER
# =========================================================

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer

        fields = [
            "id",
            "full_name",
            "phone",
            "province",
            "city",
            "address",
        ]


# =========================================================
# ORDER ITEM SERIALIZER
# =========================================================

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product",
            "product_name",
            "quantity",
            "price",
            "subtotal",
        ]


# =========================================================
# ORDER SERIALIZER
# =========================================================

class OrderSerializer(serializers.ModelSerializer):

    customer = CustomerSerializer(
        read_only=True
    )

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    shipping_method_display = serializers.CharField(
        source="get_shipping_method_display",
        read_only=True
    )

    payment_method_display = serializers.CharField(
        source="get_payment_method_display",
        read_only=True
    )

    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True
    )

    payment_status_display = serializers.CharField(
        source="get_payment_status_display",
        read_only=True
    )

    class Meta:

        model = Order

        fields = [
            "id",
            "order_number",

            "customer",

            "shipping_method",
            "shipping_method_display",

            "payment_method",
            "payment_method_display",

            "status",
            "status_display",

            "payment_status",
            "payment_status_display",

            "subtotal",
            "shipping_cost",
            "total",

            "notes",

            "items",

            "created_at",
            "updated_at",
        ]