from django.contrib import admin
from django.utils.html import format_html
from settings.model.AboutUs_model import AboutUsModel

@admin.register(AboutUsModel)
class AboutUsModelAdmin(admin.ModelAdmin):
    # What displays on the landing row list
    list_display = ('title', 'show_image_preview', 'updated_at')
    
    # Fields that cannot be modified manually
    readonly_fields = ('updated_at', 'show_large_preview')
    
    # Beautifully categorized field groups
    fieldsets = (
        ("Header & Intro", {
            'fields': ('title', 'description')
        }),
        ("Our Core Pillar Philosophies", {
            'classes': ('collapse',), # Collapsible block to save screen space
            'fields': ('history', 'mission', 'vision', 'values', 'why_us')
        }),
        ("Visual Assets & Media", {
            'fields': ('main_image', 'show_large_preview')
        }),
        ("Locations & Metadata", {
            'fields': ('branch_address', 'updated_at')
        }),
    )

    # 1. Mini thumbnail for the records list
    def show_image_preview(self, obj):
        if obj.main_image:
            return format_html(f'<img src="{obj.main_image.url}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;" />')
        return "⚠️ No Image"
    show_image_preview.short_description = "Image Thumbnail"

    # 2. Large display inside the editing module
    def show_large_preview(self, obj):
        if obj.main_image:
            return format_html(f'<img src="{obj.main_image.url}" style="max-width: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />')
        return "Upload an image asset to see a rendering preview."
    show_large_preview.short_description = "Live Canvas Preview"

    # Optional: Prevents your team from creating multiple About Us pages. 
    # Keeps it strictly to a single page setup. Remove this if you want multiple rows.
    def has_add_permission(self, request):
        if AboutUsModel.objects.exists():
            return False
        return True
