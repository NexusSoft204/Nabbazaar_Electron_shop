from rest_framework.serializers import ModelSerializer
from settings.model.ContactInfo_model import ContactInfoModel


class ContactInfoSerializer(ModelSerializer):
    class Meta:
        model = ContactInfoModel
        fields = '__all__'
        