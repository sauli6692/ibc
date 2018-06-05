from rest_framework import viewsets

from pmm.models import Lesson
from pmm.serializers import LessonSerializer
from core.views.mixins import CreateListMixin


class LessonViewSet(CreateListMixin, viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filter_fields = ('name', 'discipleship',)
    search_fields = ('name', 'discipleship__name',)
