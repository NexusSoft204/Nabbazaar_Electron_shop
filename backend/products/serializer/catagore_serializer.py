from rest_framework import serializers
from products.model.Brand_model import Brand
from products.model.Category_model import Category
from products.model.Product_model import Product



class CategoryChildSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "title",
            "slug",
            "product_count",
        ]

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class CategoryBrandSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = [
            "id",
            "title",
            "slug",
            "logo",
            "product_count",
        ]

    def get_product_count(self, obj):
        return obj.products.filter(
            is_active=True
        ).count()


class CategoryProductSerializer(serializers.ModelSerializer):
    brand = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    final_price = serializers.SerializerMethodField()
    has_discount = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "slug",
            "image",

            "brand",
            "category",

            "price",
            "discount_price",
            "final_price",
            "has_discount",

            "stock",
            "is_active",
            "is_special_offer",
            "is_suggested",

            "sales_count",
            "visited_count",

            "short_description",
        ]

    def get_brand(self, obj):
        if not obj.brand:
            return None

        return {
            "id": obj.brand.id,
            "title": obj.brand.title,
            "slug": obj.brand.slug,
        }

    def get_category(self, obj):
        if not obj.category:
            return None

        return {
            "id": obj.category.id,
            "title": obj.category.title,
            "slug": obj.category.slug,
        }

    def get_final_price(self, obj):
        if obj.has_discount:
            return obj.discount_price

        return obj.price

    def get_has_discount(self, obj):
        return obj.has_discount


class CategoryDetailSerializer(serializers.ModelSerializer):

    sub_categories = serializers.SerializerMethodField()
    brands = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()
    best_sellers = serializers.SerializerMethodField()

    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category

        fields = [
            "id",
            "title",
            "slug",
            "description",
            "image",

            "product_count",

            "sub_categories",
            "brands",

            "products",
            "best_sellers",
        ]

    def get_product_count(self, obj):
        return obj.products.filter(
            is_active=True
        ).count()

    def get_sub_categories(self, obj):

        children = obj.children.filter(
            is_active=True
        )

        return CategoryChildSerializer(
            children,
            many=True
        ).data

    def get_brands(self, obj):

        brand_ids = obj.products.filter(
            is_active=True,
            brand__isnull=False
        ).values_list(
            "brand_id",
            flat=True
        ).distinct()

        brands = Brand.objects.filter(
            id__in=brand_ids,
            is_active=True
        )

        return CategoryBrandSerializer(
            brands,
            many=True
        ).data

    def get_products(self, obj):

        products = obj.products.filter(
            is_active=True
        ).select_related(
            "brand",
            "category"
        )

        return CategoryProductSerializer(
            products,
            many=True,
            context=self.context
        ).data

    def get_best_sellers(self, obj):

        products = obj.products.filter(
            is_active=True
        ).select_related(
            "brand",
            "category"
        ).order_by(
            "-sales_count"
        )[:5]

        return CategoryProductSerializer(
            products,
            many=True,
            context=self.context
        ).data