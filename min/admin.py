from django.contrib import admin

from .models import (
    Ministry,
    MinistryObjective,
)


class MinistryObjectiveInline(admin.TabularInline):
    model = MinistryObjective
    extra = 0


@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name', 'description',)
    list_filter = ('name', 'description')
    list_display_links = ['pk', 'name']
    ordering = ('pk', 'name',)
    search_fields = ('name', 'description',)
    inlines = [MinistryObjectiveInline]
