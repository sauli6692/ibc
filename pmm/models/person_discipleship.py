from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _


class PersonDiscipleship(models.Model):
    class Meta:
        verbose_name = _('Person in Discipleship')
        verbose_name_plural = _('People in Discipleship')
        unique_together = ('disciple', 'discipleship')
        permissions = (
            ('read_persondiscipleship', 'Can read ' + ugettext('Person in Discipleship')),
        )

    disciple = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Disciple'),
        related_name='my_disciples',
    )

    discipleship = models.ForeignKey(
        'pmm.Discipleship',
        on_delete=models.CASCADE,
        verbose_name=_('Discipleship'),
        related_name='my_discipleships',
    )

    teacher = models.ForeignKey(
        'pmm.Person',
        on_delete=models.CASCADE,
        verbose_name=_('Teacher'),
        related_name='my_teachers'
    )

    last_lesson = models.ForeignKey(
        'pmm.Lesson',
        on_delete=models.CASCADE,
        verbose_name=_('Last Lesson'),
    )

    start_date = models.DateField(_('Discipleship Start Date'), null=True)

    end_date = models.DateField(_('Discipleship End Date'), null=True)
