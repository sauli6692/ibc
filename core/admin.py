from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.utils.translation import ugettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    list_display = ('id', 'username', 'is_active', 'owner',)
    list_filter = ('username', 'is_active', 'owner',)
    ordering = ('username',)
    readonly_fields = ('last_login',)
    fieldsets = (
        (None, {'fields': ('owner', 'username', 'password',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_superuser',
                                       'groups',)}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('owner', 'username', 'password1', 'password2',),
        }),
        (_('Permissions'), {'fields': ('is_active', 'is_superuser', 'groups',)}),
    )
