from rest_framework import serializers

from .lookup_tables import (
    IntegrationLevelSerializer,
    OccupationSerializer,
    CivilStatusSerializer,
)
from ..models import Person


class PersonSerializer(serializers.ModelSerializer):
    integration_level = IntegrationLevelSerializer()
    occupation = OccupationSerializer()
    civil_status = CivilStatusSerializer()
    gender = serializers.CharField(source='get_gender_display')

    class Meta:
        model = Person
        fields = (
            'first_name',
            'last_name',
            'birthday',
            'new_birthday',
            'gender',
            'baptized',
            'last_visit',
            'integration_level',
            'occupation',
            'civil_status',
        )
