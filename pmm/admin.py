from django.contrib import admin

from .models import Member, Person


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'birthday', 'new_birthday', 'gender', 'last_visit',)
    list_filter = ('gender', 'last_visit')
    ordering = ('first_name', 'last_name',)
    search_fields = ('first_name', 'last_name',)


@admin.register(Member)
class MemberAdmin(PersonAdmin):
    pass
