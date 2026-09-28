from rest_framework import serializers
from settings.model.AboutUs_model import AboutUsModel
# from accounts.models import TeamProject
# from products.models import Products 
# from django.contrib.auth.models import User 

class AboutUsSerializer(serializers.ModelSerializer):
    
    # projects_count = serializers.SerializerMethodField()
    # experts_count = serializers.SerializerMethodField()
    # users_count = serializers.SerializerMethodField()

    class Meta:
        model = AboutUsModel
        fields = '__all__' 

    # ۱. شمارش خودکار تعداد کل پروژه‌ها/محصولات
    # def get_projects_count(self, obj):
    #     return Products.objects.count()

    # ۲. شمارش خودکار تعداد اعضای تیم (متخصصین)
    # def get_experts_count(self, obj):
    #     return TeamProject.objects.count()

    # ۳. شمارش خودکار تعداد کاربران ثبت‌نام شده در سایت
    # def get_users_count(self, obj):
    #     return User.objects.filter(is_active=True).count() # فقط کاربران فعال را می‌شمارد
