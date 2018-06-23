from rest_framework import serializers

from ..models import Harvest
from pmm.serializers import PersonSerializer


class HarvestSerializer(PersonSerializer):
    route_value = serializers.StringRelatedField(source='route')

    class Meta(PersonSerializer.Meta):
        model = Harvest
        fields = PersonSerializer.Meta.fields + ('route', 'route_value', 'discarded', 'discarded_reason',)
        extra_kwargs = {
            'route': {'write_only': True},
        }
