from rest_framework import serializers
from settings.model.Store_Benefits import Store_Benefits

class Store_BenefitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store_Benefits
        fields = "__all__"