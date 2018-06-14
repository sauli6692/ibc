from rest_framework import serializers

from ..models import Ministry, MinistryObjective


class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = (
            'pk',
            'name',
            'description',
            'members',
            'leaders',
        )
        extra_kwargs = {
            'members': {'write_only': True},
            'leaders': {'write_only': True},
        }


class MinistryObjectiveSerializer(serializers.ModelSerializer):
    ministry_value = serializers.StringRelatedField(source='ministry')

    class Meta:
        model = MinistryObjective
        fields = (
            'pk',
            'objective',
            'ministry',
            'ministry_value',
        )
        extra_kwargs = {
            'ministry': {'write_only': True},
        }
