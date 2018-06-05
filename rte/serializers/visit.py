from rest_framework import serializers

from ..models import Visit


class VisitSerializer(serializers.ModelSerializer):
    collaborator_value = serializers.StringRelatedField(source='collaborator')
    harvest_value = serializers.StringRelatedField(source='harvest')

    class Meta:
        model = Visit
        fields = (
            'pk',
            'collaborator',
            'collaborator_value',
            'harvest',
            'harvest_value',
            'date',
        )
        extra_kwargs = {
            'collaborator': {'write_only': True},
            'harvest': {'write_only': True},
        }
