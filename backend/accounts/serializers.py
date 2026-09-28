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
