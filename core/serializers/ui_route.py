from rest_framework import serializers

from ..models import UIRoute


class UIRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UIRoute
        fields = (
            'pk',
            'slug',
            'groups',
        )
