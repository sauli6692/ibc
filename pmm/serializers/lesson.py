from rest_framework import serializers

from ..models import Lesson


class DiscipleshipField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            'id': value.id,
            'name': value.name,
        }


class LessonSerializer(serializers.ModelSerializer):
    discipleship_value = serializers.StringRelatedField(source='discipleship')

    class Meta:
        model = Lesson
        fields = (
            'pk',
            'name',
            'description',
            'discipleship',
            'discipleship_value',
        )
        extra_kwargs = {
            'discipleship': {'write_only': True},
        }
