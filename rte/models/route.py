from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin, DirectionMixin


class Route(ContentMixin, DirectionMixin):
    class Meta:
        verbose_name = _('Route')
        verbose_name_plural = _('Routes')
        permissions = (
            ('read_route', 'Can read ' + ugettext('Route')),
        )

    zone_map = models.ImageField(
        upload_to='images/route/',
        verbose_name=_('Map Zone'),
        max_length=255,
    )
