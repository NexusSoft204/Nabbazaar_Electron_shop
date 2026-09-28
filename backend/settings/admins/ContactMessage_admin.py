from django.contrib import admin
from settings.model.ContactMessage_model import ContactMessageModel

@admin.register(ContactMessageModel)
class ContactMessageModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'email', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'phone_number', 'email', 'subject', 'message', 'created_at')
    
    # اضافه کردن اکشن اختصاصی برای مارک کردن دسته‌جمعی پیام‌ها به عنوان خوانده شده
    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
