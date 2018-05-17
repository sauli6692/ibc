from rest_framework import serializers

from ..models import Lesson


class DiscipleshipField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            'id': value.id,
            'name': value.name,
        }


class LessonSerializer(serializers.ModelSerializer):
    discipleship = DiscipleshipField(read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'
