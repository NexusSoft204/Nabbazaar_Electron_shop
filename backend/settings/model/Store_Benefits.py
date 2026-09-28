from django.db import models

class Store_Benefits(models.Model):
    title = models.CharField(max_length=150, verbose_name='Benefit Title')
    image = models.ImageField(upload_to='benefits/', verbose_name='Benefit Icon/Image')

    class Meta:
        verbose_name = 'Store Benefit'
        verbose_name_plural = 'Store Benefits'
        ordering = ['title'] 

    def __str__(self):
        return f"{self.title}"
