from rest_framework import serializers

from ..models import PersonDiscipleship


class PersonDiscipleshipSerializer(serializers.ModelSerializer):
    disciple_value = serializers.StringRelatedField(source='disciple')
    discipleship_value = serializers.StringRelatedField(source='discipleship')
    teacher_value = serializers.StringRelatedField(source='teacher')
    last_lesson_value = serializers.StringRelatedField(source='last_lesson')

    class Meta:
        model = PersonDiscipleship
        fields = (
            'pk',
            'disciple',
            'discipleship',
            'teacher',
            'last_lesson',
            'start_date',
            'end_date',
            'disciple_value',
            'discipleship_value',
            'teacher_value',
            'last_lesson_value',
        )
        extra_kwargs = {
            'disciple': {'write_only': True},
            'discipleship': {'write_only': True},
            'teacher': {'write_only': True},
            'last_lesson': {'write_only': True},
        }
