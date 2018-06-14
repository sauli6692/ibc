from django.contrib import admin

from .models import (
    Ministry,
    MinistryObjective,
)
from core.admin import ContentAdmin


class MinistryObjectiveInline(admin.TabularInline):
    model = MinistryObjective
    extra = 0


@admin.register(Ministry)
class MinistryAdmin(ContentAdmin):
    inlines = [MinistryObjectiveInline]
