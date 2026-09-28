from django.db import models

class TermsAndConditionsModel(models.Model):
    title = models.CharField(max_length=200, default="Terms and Conditions", verbose_name="Document Title")
    terms_of_use = models.TextField(verbose_name="Terms of Use (قوانین استفاده عمومی)")
    purchase_terms = models.TextField(verbose_name="Purchase Terms (شرایط خرید)")
    order_rules = models.TextField(verbose_name="Order Rules (مقررات ثبت سفارش)")
    payment_rules = models.TextField(verbose_name="Payment Rules (قوانین پرداخت مالی)")
    shipping_rules = models.TextField(verbose_name="Shipping & Delivery Rules (مقررات ارسال و تحویل)")
    cancellation_terms = models.TextField(verbose_name="Cancellation & Refund Terms (شرایط لغو و استرداد)")
    
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    class Meta:
        verbose_name = "Terms and Conditions"
        verbose_name_plural = "Terms and Conditions Management"

    def __str__(self):
        return f"{self.title} (Updated: {self.updated_at.strftime('%Y-%m-%d')})"
