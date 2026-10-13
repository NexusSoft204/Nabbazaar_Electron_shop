from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    # فیلد رمز عبور را فقط برای نوشتن تنظیم می‌کنیم تا در پاسخ‌ها نمایش داده نشود
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=True) # ایمیل را اجباری می‌کنیم

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_username(self, value):
        # بررسی تکراری نبودن نام کاربری
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("این نام کاربری قبلاً انتخاب شده است.")
        return value

    def validate_email(self, value):
        # بررسی تکراری نبودن ایمیل
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("این ایمیل قبلاً ثبت شده است.")
        return value

    def create(self, validated_data):
        # ساخت کاربر با رمز عبور رمزنگاری شده به روش پیش‌فرض جنگو
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
















from dj_rest_auth.serializers import PasswordResetSerializer
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

class CustomPasswordResetSerializer(PasswordResetSerializer):
    def save(self):
        email = self.validated_data['email']
        users = get_user_model().objects.filter(email=email, is_active=True)
        
        for user in users:
            from django.contrib.auth.tokens import default_token_generator
            from django.utils.http import urlsafe_base64_encode
            from django.utils.encoding import force_bytes
            
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            
            url = settings.PASSWORD_RESET_CONFIRM_URL
            final_url = f"{url}?uid={uid}&token={token}"
            
            # چاپ لینک در ترمینال لوکال برای کار شما
            print("\n" + "="*50)
            print("🔵 LINK FOR NEXT.JS FRONTLEND:")
            print(final_url)
            print("="*50 + "\n")
            
            # تلاش برای ارسال ایمیل واقعی (اگر سرور مسدود نباشد کار میکند، اگر مسدود باشد در لوکال خطایی نمیدهد)
            try:
                subject = "بازیابی رمز عبور - نب بازار"
                message = f"کاربر گرامی، برای تغییر رمز عبور خود روی لینک زیر کلیک کنید:\n\n{final_url}"
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email], fail_silently=False)
            except Exception as e:
                # اگر اینترنت لوکال پورت را بسته بود، خطا را نادیده بگیر تا فرانت رندر شود
                pass
            
        return email