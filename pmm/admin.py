from django.contrib import admin

from .models import (
    CivilStatus,
    Discipleship,
    IntegrationLevel,
    Family,
    FamilyRelationship,
    Lesson,
    Member,
    Occupation,
    Person,
    PersonDiscipleship,
)
from core.admin import LookupTableAdmin, ContentAdmin


@admin.register(CivilStatus)
class CivilStatusAdmin(LookupTableAdmin):
    pass


@admin.register(IntegrationLevel)
class IntegrationLevelAdmin(LookupTableAdmin):
    pass


@admin.register(FamilyRelationship)
class FamilyRelationshipAdmin(LookupTableAdmin):
    pass


@admin.register(Occupation)
class OccupationAdmin(LookupTableAdmin):
    pass


@admin.register(Discipleship)
class DiscipleshipAdmin(ContentAdmin):
    pass


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('name', 'lesson_number', 'description', 'discipleship',)
    list_filter = ('name', 'description', 'discipleship',)
    list_display_links = ['lesson_number', 'name']
    ordering = ('lesson_number', 'name', 'description', 'discipleship',)
    search_fields = ('name', 'description', 'discipleship',)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('pk', 'first_name', 'last_name', 'birthday', 'new_birthday', 'gender', 'last_visit',)
    list_filter = ('gender', 'last_visit')
    list_display_links = ['pk', 'first_name']
    ordering = ('first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)


@admin.register(Member)
class MemberAdmin(PersonAdmin):
    pass


@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('pk', 'person', 'family', 'relationship',)
    list_filter = ('person', 'family', 'relationship',)
    list_display_links = ['pk', 'person']
    ordering = ('pk', 'person', 'family', 'relationship',)
    search_fields = ('pk', 'person', 'family', 'relationship',)


@admin.register(PersonDiscipleship)
class PersonDiscipleshipAdmin(admin.ModelAdmin):
    list_display = ('pk', 'discipleship', 'disciple', 'teacher', 'last_lesson', 'start_date', 'end_date',)
    list_filter = ('disciple', 'discipleship', 'teacher', 'last_lesson', 'start_date', 'end_date',)
    list_display_links = ['pk', 'discipleship']
    ordering = ('pk', 'disciple', 'discipleship', 'teacher', 'last_lesson', 'start_date', 'end_date',)
    search_fields = ('pk', 'disciple', 'discipleship', 'teacher', 'last_lesson', 'start_date', 'end_date',)
