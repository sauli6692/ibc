from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin, DirectionMixin


class Route(ContentMixin, DirectionMixin):
    class Meta:
        verbose_name = _('Ruta')
        verbose_name_plural = _('Rutas')
        permissions = (
            ('read_route', 'Can read ' + ugettext('Ruta')),
        )

    zoneMap = models.ImageField(
        upload_to='images/route/',
        verbose_name=_('Miembros'),
        max_length=255,
    )
