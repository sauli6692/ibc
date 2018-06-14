from rest_framework import serializers

from ..models import Route


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = (
            'pk',
            'name',
            'description',
            'direction_main',
            'direction_extra',
            'zone_map'
        )
