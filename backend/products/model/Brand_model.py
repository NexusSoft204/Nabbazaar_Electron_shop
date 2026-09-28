from django.db import models
from django.utils.text import slugify

class Brand(models.Model):
    title = models.CharField(max_length=200, verbose_name='Title Brand')
    slug = models.SlugField(max_length=200, unique=True, verbose_name=' (Slug)')
    logo = models.ImageField(upload_to='brands/%Y/%m/', verbose_name='Brand logo')
    is_active = models.BooleanField(default=True, verbose_name='status active/inactive')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='create_at')

    class Meta:
        verbose_name = "Brand"
        verbose_name_plural = "Brands"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True) 
        super().save(*args, **kwargs)
