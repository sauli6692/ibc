from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .user_manager import UserManager
from .mixins.log_fields import LogFieldsMixin


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin, LogFieldsMixin):
    username = models.CharField(_('Usuario'), max_length=50, unique=True)
    is_active = models.BooleanField(
        _('Activo'), default=True, help_text='Activo')

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('Usuario')
        verbose_name_plural = _('Usuarios')

    def __str__(self):
        return self.username

    def get_full_name(self):
        """Get member full name."""
        return '{0} {1}'.format('self.member.first_name', 'self.member.last_name').strip()

    def get_short_name(self):
        """Get member first name."""
        return 'self.member.first_name'
