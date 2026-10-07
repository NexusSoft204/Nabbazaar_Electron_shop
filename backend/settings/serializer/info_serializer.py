from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework import serializers

from products.models import Product
from basket.models import OrderItem


class DashboardStatisticsSerializer(serializers.Serializer):
    users_count = serializers.SerializerMethodField()
    products_count = serializers.SerializerMethodField()
    sold_products_count = serializers.SerializerMethodField()

    def get_users_count(self, obj):
        return User.objects.count()

    def get_products_count(self, obj):
        return Product.objects.count()

    def get_sold_products_count(self, obj):
        return (
            OrderItem.objects
            .filter(order__status="completed")
            .aggregate(total=Sum("quantity"))
            ["total"]
            or 0
        )