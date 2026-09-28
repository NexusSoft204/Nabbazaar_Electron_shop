from rest_framework import serializers
from settings.model.ContactMessage_model import ContactMessageModel

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessageModel
        fields = ['id', 'name', 'phone_number', 'email', 'subject', 'message', 'created_at']
