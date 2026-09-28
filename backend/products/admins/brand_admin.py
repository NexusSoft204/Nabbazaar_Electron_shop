from django.contrib import admin
from django.utils.html import format_html
from products.model.Brand_model import Brand

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    
    list_display = ('show_logo', 'title', 'slug', 'is_active', 'created_at')
    
    
    list_display_links = ('show_logo', 'title')
    
    
    list_editable = ('is_active',)
    
    
    list_filter = ('is_active', 'created_at')
    
    
    search_fields = ('title', 'slug')
    
    
    prepopulated_fields = {'slug': ('title',)}
    
    
    def show_logo(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: contain;" />', obj.logo.url)
        return "null logo"
    
    show_logo.short_description = 'image brand'
