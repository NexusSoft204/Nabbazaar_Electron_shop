from django.contrib import admin
from django.utils.html import format_html
from products.model.Product_model import Product, ProductColor, ProductAttribute
from products.model.ProductVariant_model import ProductVariant
from products.admins.ProductGallery_admin import ProductGalleryInline # Ensure gallery inline path is correct

# =========================================================================
# 1. Base Configuration Units
# =========================================================================
@admin.register(ProductColor)
class ProductColorAdmin(admin.ModelAdmin):
    list_display = ['color_name', 'color_code']
    search_fields = ['color_name']


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fk_name = 'product'
    autocomplete_fields = ['color']


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 1


# =========================================================================
# 2. Main Product Form Controller
# =========================================================================
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('show_image', 'product_name', 'category', 'brand', 'price', 'discount_price', 'stock', 'is_active', 'is_special_offer')
    list_display_links = ('show_image', 'product_name')
    list_filter = ('is_active', 'is_special_offer', 'is_suggested', 'category', 'brand', 'created_at')
    search_fields = ('product_name', 'slug', 'brand__title', 'category__title')
    prepopulated_fields = {'slug': ('product_name',)}
    list_editable = ('is_active', 'is_special_offer')
    autocomplete_fields = ['category', 'brand']
    
    # 📌 Inline assignments linked securely directly inside the target class
    inlines = [ProductAttributeInline, ProductVariantInline, ProductGalleryInline]
    
    readonly_fields = ('price', 'discount_price', 'stock', 'sales_count', 'visited_count', 'created_at', 'updated_at')
    
    fieldsets = (
        ('اطلاعات اصلی', {
            'fields': ('product_name', 'slug', 'category', 'brand', 'image')
        }),
        ('بخش مالی و انبار (محاسبه خودکار)', {
            'description': 'این مقادیر بر اساس تنوع‌های ثبت شده در پایین صفحه به صورت خودکار آپدیت می‌شوند.',
            'fields': ('price', 'discount_price', 'stock')
        }),
        ('وضعیت‌ها و آمار', {
            'fields': ('is_active', 'is_special_offer', 'is_suggested', 'sales_count', 'visited_count')
        }),
        ('توضیحات محصول', {
            'fields': ('short_description', 'full_description', 'whats_in_the_box')
        }),
        ('تواریخ', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',), 
        }),
    )

    def show_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />', obj.image.url)
        return "بدون تصویر"
    
    show_image.short_description = 'تصویر'


# Optional: Register standalone attribute explorer if needed
@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'title', 'value']
