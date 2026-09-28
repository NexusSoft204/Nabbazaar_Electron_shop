from django.contrib import admin
from products.model.Category_model import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    # نمایش فیلدها در لیست
    list_display = ('title', 'parent', 'slug', 'is_active')
    
    # فیلتر کردن بر اساس وضعیت فعال بودن و اینکه آیا دسته اصلی است یا زیردسته
    list_filter = ('is_active', 'parent')
    
    # جستجو در عنوان، اسلاگ و حتی عنوان دسته والد
    search_fields = ('title', 'slug', 'parent__title')
    
    # پر شدن خودکار اسلاگ هنگام تایپ عنوان
    prepopulated_fields = {'slug': ('title',)}
    
    # امکان ویرایش سریع وضعیت فعال بودن از داخل لیست
    list_editable = ('is_active',)
    
    # بهبود سرعت لود صفحات در صورت زیاد بودن تعداد دسته‌ها
    autocomplete_fields = ['parent']
