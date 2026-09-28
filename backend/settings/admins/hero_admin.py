from django.contrib import admin
from django.utils.safestring import mark_safe
from settings.model.hero_model import HeroSlider

@admin.register(HeroSlider)
class HeroSliderAdmin(admin.ModelAdmin):
    # Columns displayed in the list view
    list_display = ('image_preview', 'title', 'is_active', 'order', 'updated_at')
    
    # Fields that can be clicked to open the edit page
    list_display_links = ('image_preview', 'title')
    
    # Quick editable fields directly from the list view
    list_editable = ('is_active', 'order')
    
    # Search functionality
    search_fields = ('title', 'subtitle')
    
    # Filter sidebar options
    list_filter = ('is_active', 'created_at')
    
    # Organized layout for the edit form
    fieldsets = (
        ('General Information', {
            'fields': ('title', 'subtitle', 'image', 'is_active', 'order')
        }),
        ('Action Buttons', {
            'fields': (
                ('first_btn_text', 'first_btn_url'),
                ('second_btn_text', 'second_btn_url')
            ),
            'description': 'Configure the text and links for the slider call-to-action buttons.'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',), # Hides this section by default
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')

    # Custom method to display an image thumbnail in the admin board
    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" style="width: 80px; height: auto; border-radius: 4px;" />')
        return "No Image"
    
    image_preview.short_description = 'Preview'
