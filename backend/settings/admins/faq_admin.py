from django.contrib import admin
from settings.model.faq_model import FAQModel

@admin.register(FAQModel)
class FAQModelAdmin(admin.ModelAdmin):
    
    list_display = ('title', 'sort_order', 'is_active', 'created_at')
    
    
    list_editable = ('sort_order', 'is_active')
    
    
    list_filter = ('is_active', 'created_at')
    
    
    search_fields = ('title', 'description')
    
    
    readonly_fields = ('created_at',)

    fieldsets = (
        ("Question Details", {
            'fields': ('title', 'description')
        }),
        ("Display Preferences", {
            'fields': ('sort_order', 'is_active', 'created_at')
        }),
    )
