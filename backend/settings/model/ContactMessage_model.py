from django.db import models
from django.core.validators import RegexValidator
from django.core.mail import send_mail
from django.conf import settings

# تنظیم ریجکس اختصاصی شماره‌های افغانستان (شروع با 07 و دارای 9 رقم)
phone_validator = RegexValidator(
    regex=r'^07\d{8}$',
    message="Phone number must start with 07 and be exactly 9 digits."
)

class ContactMessageModel(models.Model):
    name = models.CharField(max_length=200, verbose_name='Sender Name')
    phone_number = models.CharField(max_length=10, validators=[phone_validator], verbose_name='Phone Number')
    email = models.EmailField(verbose_name='Email Address')
    subject = models.CharField(max_length=200, verbose_name='Subject')
    message = models.TextField(verbose_name='Message Text')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Sent At')
    is_read = models.BooleanField(default=False, verbose_name='Is Read By Admin')

    class Meta:
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

    # بازنویسی متد save برای ارسال خودکار ایمیل به ادمین به محض ارسال پیام
    def save(self, *args, **kwargs):
        is_new = self.pk is None  # بررسی اینکه آیا این یک پیام جدید است یا ویرایش قبلی
        super().save(*args, **kwargs)  # ابتدا ذخیره در دیتابیس

        if is_new:
            try:
                # ساختن متن ایمیل ارسالی به مدیریت
                email_subject = f"📩 New Contact Message: {self.subject}"
                email_body = f"""
                You have received a new contact message from your website.
                
                Sender Details:
                - Name: {self.name}
                - Email: {self.email}
                - Phone: {self.phone_number}
                - Sent At: {self.created_at}
                
                Message Content:
                ----------------------------------------
                {self.message}
                ----------------------------------------
                
                Please log in to the admin panel to reply.
                """
                
                # دستور ارسال ایمیل جنگو
                send_mail(
                    subject=email_subject,
                    message=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ADMIN_EMAIL], # ایمیل دریافت‌کننده (شما)
                    fail_silently=False, # اگر خطا داد سرور کرش نکند ولی در لاگ‌ها نشان دهد
                )
            except Exception as e:
                # لاگ کردن خطا در صورت عدم اتصال به سرور ایمیل (به دلایل انترنت و...)
                print(f"Failed to send email notification: {e}")
