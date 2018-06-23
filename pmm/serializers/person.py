from rest_framework import serializers

from ..models import Person


class PersonSerializer(serializers.ModelSerializer):
    integration_level_value = serializers.StringRelatedField(source='integration_level')
    occupation_value = serializers.StringRelatedField(source='occupation')
    civil_status_value = serializers.StringRelatedField(source='civil_status')
    gender_value = serializers.CharField(source='get_gender_display', read_only=True)

    class Meta:
        model = Person
        fields = (
            'pk',
            'first_name',
            'last_name',
            'birthday',
            'new_birthday',
            'gender',
            'gender_value',
            'baptized',
            'last_visit',
            'integration_level',
            'integration_level_value',
            'occupation',
            'occupation_value',
            'civil_status',
            'civil_status_value',
            'direction_main',
            'direction_extra',
        )
        extra_kwargs = {
            'integration_level': {'write_only': True},
            'occupation': {'write_only': True},
            'civil_status': {'write_only': True},
            'gender': {'write_only': True},
        }
