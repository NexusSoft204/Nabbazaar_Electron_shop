from django.db import models

class AboutUsModel(models.Model):
    title = models.自由Field = models.CharField(max_length=200, verbose_name='Title')
    description = models.TextField(verbose_name='Description')
    history = models.TextField(verbose_name='Our History')
    mission = models.TextField(verbose_name='Our Mission')
    vision = models.TextField(verbose_name='Our Vision')
    values = models.TextField(verbose_name='Core Values')
    why_us = models.TextField(verbose_name='Why Choose Us')
    
    # Corrected to ImageField for proper file uploading
    main_image = models.ImageField(upload_to='about_us/', verbose_name='Main Display Image')
    branch_address = models.TextField(verbose_name='Branch Addresses / Locations')
    
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated')

    class Meta:
        verbose_name = 'About Us Page'
        verbose_name_plural = 'About Us Page Management'

    def __str__(self):
        return f"{self.title} (Last updated: {self.updated_at.strftime('%Y-%m-%d')})"
