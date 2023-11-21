from rest_framework import serializers
from .models import *


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
        
    def validate_name(self, value):
        if self.instance:
            if self.instance.name == value:
                return value
        existing_country = Country.objects.filter(name=value).exclude(
            pk=self.instance.pk if self.instance else None).first()
        if existing_country:
            raise serializers.ValidationError("Country name already exists.")
        return value
