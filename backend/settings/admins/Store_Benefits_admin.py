from django.contrib import admin
from django.utils.html import format_html
from settings.model.Store_Benefits import Store_Benefits

@admin.register(Store_Benefits)
class Store_BenefitsAdmin(admin.ModelAdmin):
    # ستون‌های نمایشی در جدول اصلی
    list_display = ('show_icon', 'title')
    
    # قابلیت جستجو (کاما در انتها برای تاپل بودن الزامی است)
    search_fields = ('title',)
    
    # فیلدهای فقط خواندنی
    readonly_fields = ('show_icon_large',)

    # دسته‌بندی فیلدها در صفحه ویرایش
    fieldsets = (
        ("Content Info", {
            'fields': ('title',)  # کاما اضافه شد
        }),
        ("Visual Asset", {
            'fields': ('image', 'show_icon_large')
        }),
    )

    # ۱. نمایش تصویر کوچک در لیست ادمین
    def show_icon(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" style="width: 40px; height: 40px; object-fit: contain;" />')
        return "No Icon"
    show_icon.short_description = "Icon Preview"

    # ۲. پیش‌نمایش بزرگ تصویر در صفحه ویرایش
    def show_icon_large(self, obj):
        if obj.image:
            return format_html(f'<img src="{obj.image.url}" style="max-width: 120px; max-height: 120px; object-fit: contain;" />')
        return "No image uploaded yet."
    show_icon_large.short_description = "Current Icon"
