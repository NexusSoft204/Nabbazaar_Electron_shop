from django.db import models

class FAQModel(models.Model):
    title = models.CharField(max_length=250, verbose_name='Question Title')
    description = models.TextField(verbose_name='Answer / Description')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='Sort Order')
    is_active = models.BooleanField(default=True, verbose_name='Is Active')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')

    class Meta:
        verbose_name = 'FAQ Item'
        verbose_name_plural = 'Frequently Asked Questions (FAQ)'
        ordering = ['sort_order', 'title']

    def __str__(self):
        return f"{self.title}"
