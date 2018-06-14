from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

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
        verbose_name = _('User')
        verbose_name_plural = _('Users')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()

    username = models.CharField(_('User'), max_length=50, unique=True)
    is_active = models.BooleanField(_('Active'), default=True,)
    owner = models.OneToOneField(
        'pmm.Member',
        verbose_name=_('Owner'),
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
        return '{0} {1}'.format(self.owner.first_name, self.owner.last_name).strip()

    def get_short_name(self):
        """Get member first name."""
        return self.owner.first_name


# Serializers
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username',
                                               instance.username)
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and password == confirm_password:
            instance.set_password(password)

        instance.save()
        return instance

    def validate(self, data):
        '''
        Ensure the passwords are the same
        '''
        if data['password']:
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError(
                    _('Incorrect Confirmation Password')
                )
        return data
