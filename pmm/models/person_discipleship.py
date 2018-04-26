from django.db import models
from django.utils.translation import ugettext_lazy as _


class PersonDiscipleship(models.Model):
    class Meta:
        verbose_name = _('Persona en Discipulado')
        verbose_name_plural = _('Personas en Discipulados')
        unique_together = ('disciple', 'discipleship')

    disciple = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Discipulo'),
        related_name='my_disciples',
    )

    discipleship = models.ForeignKey(
        'pmm.Discipleship',
        on_delete=models.CASCADE,
        verbose_name=_('Discipulado'),
        related_name='my_discipleships',
    )

    teacher = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Discipulador'),
        related_name='my_teachers'
    )

    last_lesson = models.ForeignKey(
        'pmm.Lesson',
        on_delete=models.CASCADE,
        verbose_name=_('Última Lección'),
    )

    start_date = models.DateField(_('Fecha de Inicio de Discipulado'), null=True)

    end_date = models.DateField(_('Fecha de Fin de Discipulado'), null=True)
