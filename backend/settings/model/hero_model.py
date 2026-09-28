from django.db import models

class HeroSlider(models.Model):
    title = models.CharField(max_length=200, verbose_name='Title')
    subtitle = models.TextField(verbose_name='Subtitle', blank=True, null=True)
    image = models.ImageField(upload_to='hero/', verbose_name='Slider Image')
    
    # First Button Config
    first_btn_text = models.CharField(max_length=50, default='Shop Now', verbose_name='First Button Text')
    first_btn_url = models.URLField(verbose_name='First Button URL', blank=True, null=True)
    
    # Second Button Config
    second_btn_text = models.CharField(max_length=50, default='Learn More', verbose_name='Second Button Text')
    second_btn_url = models.URLField(verbose_name='Second Button URL', blank=True, null=True)
    
    # Management and Ordering
    is_active = models.BooleanField(default=True, verbose_name='Is Active')
    order = models.PositiveIntegerField(default=0, verbose_name='Display Order')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Hero Slider'
        verbose_name_plural = 'Hero Sliders'
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
