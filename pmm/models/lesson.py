from django.db import models
from django.utils.translation import ugettext_lazy as _

from core.models.mixins import ContentMixin


class Lesson(ContentMixin):
    class Meta:
        verbose_name = _('Lección de Discipulado')
        verbose_name_plural = _('Lecciones de Discipulado')

    discipleship = models.ForeignKey(
        'pmm.Discipleship',
        on_delete=models.CASCADE,
        verbose_name=_('Discipulado'),
        null=True,
    )
