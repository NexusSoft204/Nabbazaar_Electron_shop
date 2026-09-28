from django.contrib import admin
from products.model.ProductVariant_model import ProductVariant

# 1. This keeps the inline layout ready to be used inside the Product page
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fk_name = 'product'
    autocomplete_fields = ['color']

# 2. Add this block to display ProductVariant as an independent model in the Admin Panel menu
@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    # This controls which columns show up when you click on "Product variants" in the dashboard
    list_display = ('product', 'color', 'storage', 'ram', 'price', 'discount_price', 'stock')
    
    # Allows clicking on the product or color link to edit the variant records
    list_display_links = ('product', 'color')
    
    # Adds quick filters on the right side panel
    list_filter = ('storage', 'ram', 'color', 'product')
    
    # Enables a top search bar to look through specific parent product titles or color names
    search_fields = ('product__product_name', 'color__color_name', 'storage', 'ram')
    
    # Optimizes dropdown loading times by converting product and color pickers into searchable inputs
    autocomplete_fields = ['product', 'color']
