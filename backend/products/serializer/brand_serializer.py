from rest_framework import serializers
from products.model.Brand_model import Brand


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['title','slug','logo']

        