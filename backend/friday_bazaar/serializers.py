from rest_framework import serializers

from .models import (
    FridayBazaarCampaign,
    FridayBazaarItem,
)


class FridayBazaarItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.product_name",
        read_only=True
    )

    product_slug = serializers.CharField(
        source="product.slug",
        read_only=True
    )

    product_image = serializers.SerializerMethodField()

    original_price = serializers.DecimalField(
        source="product.price",
        max_digits=12,
        decimal_places=0,
        read_only=True
    )

    regular_discount_price = serializers.DecimalField(
        source="product.discount_price",
        max_digits=12,
        decimal_places=0,
        read_only=True
    )

    category = serializers.CharField(
        source="product.category.title",
        read_only=True,
        allow_null=True
    )

    brand = serializers.CharField(
        source="product.brand.title",
        read_only=True,
        allow_null=True
    )

    discount_percentage = serializers.IntegerField(
        read_only=True
    )

    remaining_stock = serializers.IntegerField(
        read_only=True
    )

    is_available = serializers.BooleanField(
        read_only=True
    )

    class Meta:
        model = FridayBazaarItem

        fields = [
            "id",
            "campaign",
            "product",
            "product_name",
            "product_slug",
            "product_image",
            "category",
            "brand",
            "original_price",
            "regular_discount_price",
            "campaign_price",
            "discount_percentage",
            "stock_limit",
            "sold_count",
            "remaining_stock",
            "is_active",
            "is_available",
            "created_at",
        ]

        read_only_fields = [
            "sold_count",
            "created_at",
        ]

    def get_product_image(self, obj):
        request = self.context.get("request")

        if not obj.product.image:
            return None

        image_url = obj.product.image.url

        if request:
            return request.build_absolute_uri(image_url)

        return image_url

    def validate(self, attrs):
        product = attrs.get(
            "product",
            getattr(self.instance, "product", None)
        )

        campaign = attrs.get(
            "campaign",
            getattr(self.instance, "campaign", None)
        )

        campaign_price = attrs.get(
            "campaign_price",
            getattr(self.instance, "campaign_price", None)
        )

        stock_limit = attrs.get(
            "stock_limit",
            getattr(self.instance, "stock_limit", 0)
        )

        sold_count = (
            self.instance.sold_count
            if self.instance
            else 0
        )

        if campaign and product:
            duplicate_items = FridayBazaarItem.objects.filter(
                campaign=campaign,
                product=product
            )

            if self.instance:
                duplicate_items = duplicate_items.exclude(
                    pk=self.instance.pk
                )

            if duplicate_items.exists():
                raise serializers.ValidationError({
                    "product": (
                        "این محصول قبلاً به این کمپاین اضافه شده است."
                    )
                })

        if product and campaign_price is not None:
            if campaign_price <= 0:
                raise serializers.ValidationError({
                    "campaign_price": (
                        "قیمت کمپاین باید بیشتر از صفر باشد."
                    )
                })

            if campaign_price > product.price:
                raise serializers.ValidationError({
                    "campaign_price": (
                        "قیمت کمپاین نباید از قیمت اصلی محصول بیشتر باشد."
                    )
                })

        if stock_limit is not None and sold_count > stock_limit:
            raise serializers.ValidationError({
                "stock_limit": (
                    "سهمیه جدید نمی‌تواند کمتر از تعداد فروخته‌شده باشد."
                )
            })

        return attrs


class FridayBazaarCampaignSerializer(
    serializers.ModelSerializer
):
    items = FridayBazaarItemSerializer(
        many=True,
        read_only=True
    )

    is_running = serializers.BooleanField(
        read_only=True
    )

    class Meta:
        model = FridayBazaarCampaign

        fields = [
            "id",
            "title",
            "slug",
            "description",
            "banner",
            "start_date",
            "end_date",
            "is_active",
            "is_running",
            "items",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]

    def validate(self, attrs):
        start_date = attrs.get(
            "start_date",
            getattr(self.instance, "start_date", None)
        )

        end_date = attrs.get(
            "end_date",
            getattr(self.instance, "end_date", None)
        )

        if start_date and end_date and end_date <= start_date:
            raise serializers.ValidationError({
                "end_date": (
                    "تاریخ پایان باید بعد از تاریخ شروع باشد."
                )
            })

        return attrs