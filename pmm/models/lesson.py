from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.mixins import ContentMixin


class Lesson(ContentMixin):
    class Meta:
        verbose_name = _('Lección de Discipulado')
        verbose_name_plural = _('Lecciones de Discipulado')
        unique_together = ('lesson_number', 'discipleship',)
        ordering = ['lesson_number']
        permissions = (
            ('read_lesson', 'Can read ' + ugettext('Lección de Discipulado')),
        )

    lesson_number = models.SmallIntegerField(_('Identificador de Lección'))

    discipleship = models.ForeignKey(
        'pmm.Discipleship',
        on_delete=models.CASCADE,
        verbose_name=_('Discipulado'),
        related_name='lessons'
    )

    def __str__(self):
        return '{} - {}'.format(self.lesson_number, self.name)
