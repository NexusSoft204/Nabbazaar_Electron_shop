from django.db import models

class ContactInfoModel(models.Model):
    whatsapp = models.CharField(max_length=15, verbose_name='WhatsApp Number (e.g., +937xxxxxxx)')
    telegram = models.CharField(max_length=100, verbose_name='Telegram Username / Link')
    instagram = models.CharField(max_length=150, verbose_name='Instagram Username / Link')
    facebook = models.CharField(max_length=150, verbose_name='Facebook Page Link')
    email = models.EmailField(max_length=150, verbose_name='Shop Support Email')
    address = models.TextField(verbose_name='Physical Shop Address')
    google_map_link = models.URLField(max_length=500, verbose_name='Google Maps Embed Link')
    working_hours = models.CharField(max_length=250, verbose_name='Working Hours (e.g., Sat - Thu: 8:00 AM - 5:00 PM)')

    class Meta:
        verbose_name = 'Shop Contact Info'
        verbose_name_plural = 'Shop Contact Info Management'

    def __str__(self):
        return f"Shop Contact Matrix (Email: {self.email})"
