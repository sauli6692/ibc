from rest_framework import serializers

from ..models import (
    IntegrationLevel,
    Occupation,
    CivilStatus,
    FamilyRelationship,
)


class IntegrationLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntegrationLevel
        fields = '__all__'


class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = '__all__'


class CivilStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CivilStatus
        fields = '__all__'


class FamilyRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyRelationship
        fields = '__all__'
