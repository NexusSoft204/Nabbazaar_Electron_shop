from rest_framework import serializers
from settings.model.TermsAndConditions_model import TermsAndConditionsModel


class TermsAndConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditionsModel
        fields = "__all__"