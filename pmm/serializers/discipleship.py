from rest_framework import serializers

from .lesson import LessonSerializer
from ..models import Discipleship


class DiscipleshipSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Discipleship
        fields = (
            'pk',
            'name',
            'description',
            'lessons',
        )
