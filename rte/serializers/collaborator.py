from rest_framework import serializers

from ..models import Collaborator
from pmm.serializers import MemberSerializer


class CollaboratorSerializer(MemberSerializer):
    route_value = serializers.StringRelatedField(source='route')
    ministry_value = serializers.StringRelatedField(source='ministry')

    class Meta(MemberSerializer.Meta):
        model = Collaborator
        fields = MemberSerializer.Meta.fields + (
            'route',
            'ministry',
            'route_captain',
            'route_value',
            'ministry_value',
        )
        extra_kwargs = {
            'route': {'write_only': True},
            'ministry': {'write_only': True},
        }
