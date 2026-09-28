from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    # ارتباط با خود مدل برای ساخت ساختار درختی (والد و فرزند)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='children', 
        verbose_name='دسته والد'
    )
    title = models.CharField(max_length=200, verbose_name='عنوان دسته‌بندی')
    slug = models.SlugField(max_length=200, unique=True, allow_unicode=True, verbose_name='اسلاگ (Slug)')
    is_active = models.BooleanField(default=True, verbose_name='وضعیت فعال/غیرفعال')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')

    class Meta:
        verbose_name = "catagory"
        verbose_name_plural = "all catagory"
        # مرتب‌سازی بر اساس دسته‌های اصلی و سپس تاریخ
        ordering = ['parent__id', '-created_at']

    def __str__(self):
        # نمایش مسیر دسته در پنل ادمین (مثلاً: کالای دیجیتال > لپ‌تاپ)
        full_path = [self.title]
        k = self.parent
        while k is not None:
            full_path.append(k.title)
            k = k.parent
        return ' <- '.join(full_path)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)
