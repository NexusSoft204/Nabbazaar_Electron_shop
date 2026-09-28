from django.db import models

class ReturnPolicyModel(models.Model):
    title = models.CharField(max_length=200, default="Return and Refund Policy", verbose_name='Page Title')
    description = models.TextField(verbose_name='General Description')
    return_conditions = models.TextField(verbose_name='Return Conditions (شرایط مرجوعی)')
    returnable_items = models.TextField(verbose_name='Returnable vs Non-Returnable Items')
    time_limit = models.CharField(max_length=250, verbose_name='Time Limits (e.g., 3 Days from delivery)')
    return_steps = models.TextField(verbose_name='Step-by-Step Return Process')
    warranty_terms = models.TextField(verbose_name='Warranty Terms (شرایط ضمانت)')
    
    
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated')

    class Meta:
        verbose_name = 'Return Policy'
        verbose_name_plural = 'Return Policy Management'

    def __str__(self):
        return f"{self.title} (Updated: {self.updated_at.strftime('%Y-%m-%d')})"
