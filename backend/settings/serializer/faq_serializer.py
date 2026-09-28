from rest_framework import serializers
from settings.model.faq_model import FAQModel


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQModel
        fields = '__all__'