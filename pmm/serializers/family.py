from rest_framework import serializers

from ..models import Family


class FamilySerializer(serializers.ModelSerializer):
    person_value = serializers.StringRelatedField(source='person')
    family_value = serializers.StringRelatedField(source='family')
    relationship_value = serializers.StringRelatedField(source='relationship')

    class Meta:
        model = Family
        fields = (
            'pk',
            'person',
            'family',
            'relationship',
            'person_value',
            'family_value',
            'relationship_value',
        )
        extra_kwargs = {
            'person': {'write_only': True},
            'family': {'write_only': True},
            'relationship': {'write_only': True},
        }
