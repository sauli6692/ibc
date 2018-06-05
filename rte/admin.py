from django.contrib import admin

# Register your models here.
from .models import (
    Collaborator,
    Harvest,
    Route,
    Visit,
)
from pmm.admin import PersonAdmin
from core.admin import ContentAdmin


@admin.register(Collaborator)
class CollaboratorAdmin(PersonAdmin):
    list_display = PersonAdmin.list_display + ('route', 'route_captain',)
    list_filter = PersonAdmin.list_filter + ('route', 'route_captain',)
    search_fields = PersonAdmin.search_fields + ('route', 'route_captain',)


@admin.register(Harvest)
class HarvestAdmin(PersonAdmin):
    list_display = PersonAdmin.list_display + ('route', 'discarded',)
    list_filter = PersonAdmin.list_filter + ('route', 'discarded',)
    search_fields = PersonAdmin.search_fields + ('route', 'discarded',)


@admin.register(Route)
class RouteAdmin(ContentAdmin):
    pass


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ('pk', 'collaborator', 'harvest', 'date',)
    list_filter = ('collaborator', 'harvest', 'date',)
    list_display_links = ['pk', 'collaborator']
    ordering = ('pk', 'collaborator', 'harvest', 'date',)
    search_fields = ('collaborator', 'harvest', 'date',)
