from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .mixins.log_fields import LogFieldsMixin


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, is_superuser, **extra_fields):
        """Creates user with username and password."""

        now = timezone.now()
        if not username:
            raise ValueError('The given username must be set')

        user = self.model(
            username=username,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,
            **extra_fields
        )
        print(user.__dict__)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password=None, **extra_fields):
        return self._create_user(username, password, False, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        return self._create_user(username, password, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, LogFieldsMixin):
    class Meta:
        verbose_name = _('Usuario')
        verbose_name_plural = _('Usuarios')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()

    username = models.CharField(_('Usuario'), max_length=50, unique=True)
    is_active = models.BooleanField(_('Activo'), default=True,)
    owner = models.OneToOneField(
        'pmm.Member',
        verbose_name=_('Dueño'),
        on_delete=models.CASCADE,
        null=False
    )

    @property
    def is_staff(self):
        """Needed to acces to admin."""
        return self.is_superuser

    def __str__(self):
        return self.username

    def get_full_name(self):
        """Get member full name."""
        return '{0} {1}'.format(self.owner.information.first_name, self.owner.information.last_name).strip()

    def get_short_name(self):
        """Get member first name."""
        return self.owner.information.first_name
