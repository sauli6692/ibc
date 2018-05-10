from django.contrib import admin

from .models import Member, Person


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('information',)
    ordering = ('information',)
    search_fields = ('information',)


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'birthday', 'new_birthday', 'gender', 'last_visit',)
    list_filter = ('gender', 'last_visit')
    ordering = ('first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)
