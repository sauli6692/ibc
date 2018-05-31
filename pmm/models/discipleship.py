from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin


class Discipleship(ContentMixin):
    class Meta:
        verbose_name = _('Discipulado')
        verbose_name_plural = _('Discipulados')
        permissions = (
            ('read_discipleship', 'Can read ' + ugettext('Discipulado')),
        )
