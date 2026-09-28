from django.contrib import admin
from django.utils.html import format_html
from .models import BlogCategory, Blog

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)} # Auto-fills slug from name
    search_fields = ('name',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    # Columns rendering inside the landing list view
    list_display = ('show_thumbnail', 'title', 'category', 'author', 'is_active', 'created_at')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'category', 'created_at')
    search_fields = ('title', 'description', 'author__username')
    
    # Auto-fills slug from title as you type in the panel
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at', 'show_large_preview')

    fieldsets = (
        ("Core Identity", {
            'fields': ('title', 'slug', 'category', 'author')
        }),
        ("Article Content", {
            'fields': ('description',)
        }),
        ("Media Assets", {
            'fields': ('image', 'show_large_preview')
        }),
        ("Status & Timestamps", {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )

    def show_thumbnail(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" />')
        return "No Image"
    show_thumbnail.short_description = "Thumbnail"

    def show_large_preview(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" style="max-width: 300px; border-radius: 8px;" />')
        return "Upload a file to see a preview rendering."
    show_large_preview.short_description = "Current Cover Preview"
