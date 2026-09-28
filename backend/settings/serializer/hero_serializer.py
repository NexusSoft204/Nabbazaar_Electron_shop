from rest_framework import serializers
from settings.model.hero_model import HeroSlider

class HeroSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlider
        fields = '__all__'