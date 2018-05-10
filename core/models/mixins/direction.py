from django.db import models
from django.utils.translation import ugettext_lazy as _


class DirectionMixin(models.Model):
    """
    Adds direction_main and direction_extra fields.
    """
    class Meta:
        abstract = True

    direction_main = models.CharField(
        _('Dirección principal'),
        max_length=255,
        blank=True,
    )

    direction_extra = models.CharField(
        _('Dirección extra'),
        max_length=255,
        null=True,
        blank=True,
    )
