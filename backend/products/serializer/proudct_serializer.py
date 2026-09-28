from rest_framework import serializers
from products.model.Product_model import Product
from products.model.ProductGallery_model import ProductGallery
from products.model.Product_model import ProductColor , ProductAttribute
from products.model.ProductVariant_model import ProductVariant




# ۱. سریالایزر رنگ‌ها
class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ['id', 'color_name', 'color_code']


# ۲. سریالایزر ویژگی‌های فنی
class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'title', 'value']

# ۳. سریالایزر تنوع‌ها (Variants)
class ProductVariantSerializer(serializers.ModelSerializer):
    # برای نمایش جزییات کامل رنگ به جای فقط آی‌دی آن
    color = ProductColorSerializer(read_only=True) 
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'color', 'storage', 'ram', 'price', 'discount_price', 'stock']


# ۱. ساخت سریالایزر اختصاصی برای گالری تصاویر
class ProductGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductGallery
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    colors = ProductColorSerializer(many=True, read_only=True) 
    category = serializers.StringRelatedField()
    brand = serializers.StringRelatedField()
    
    gallery = ProductGallerySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
