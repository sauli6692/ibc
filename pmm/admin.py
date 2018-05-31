from django.contrib import admin

from .models import (
    Member,
    Person,
    Family,
)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'birthday', 'new_birthday', 'gender', 'last_visit',)
    list_filter = ('gender', 'last_visit')
    list_display_links = ['id', 'first_name']
    ordering = ('first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)


@admin.register(Member)
class MemberAdmin(PersonAdmin):
    pass


@admin.register(Family)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'person', 'family', 'relationship',)
    list_filter = ('person', 'family', 'relationship',)
    list_display_links = ['id', 'person']
    ordering = ('id', 'person', 'family', 'relationship',)
    search_fields = ('id', 'person', 'family', 'relationship',)
