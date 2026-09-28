from rest_framework import serializers
from settings.model.ReturnPolicy_model import ReturnPolicyModel


class ReturnPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReturnPolicyModel
        fields = '__all__'
