from django.db import models
from django.utils.translation import ugettext, ugettext_lazy as _

from core.models.custom_fields import FixedCharField
from core.models.mixins import DirectionMixin


class Person(DirectionMixin):
    class Meta:
        verbose_name = _('Person')
        verbose_name_plural = _('People')
        permissions = (
            ('read_person', 'Can read ' + ugettext('Person')),
        )

    gender_choices = (
        ('M', _('Man')),
        ('W', _('Woman')),
    )

    first_name = models.CharField(_('First Name'), max_length=50)
    last_name = models.CharField(_('Last Name'), max_length=50)
    birthday = models.DateField(_('Birthday'), null=True, blank=True,)
    new_birthday = models.DateField(_('New Birthday'), null=True, blank=True,)
    gender = FixedCharField(_('Gender'), max_length=1, choices=gender_choices, default='M')
    baptized = models.BooleanField(_('Baptized'), default=False)
    last_visit = models.DateField(_('Last Visit'), null=True, blank=True,)
    integration_level = models.ForeignKey(
        'pmm.IntegrationLevel',
        on_delete=models.CASCADE,
        verbose_name=_('Integration Level'),
        null=True,
        blank=True,
    )
    occupation = models.ForeignKey(
        'pmm.Occupation',
        on_delete=models.CASCADE,
        verbose_name=_('Occupation'),
        null=True,
        blank=True,
    )
    civil_status = models.ForeignKey(
        'pmm.CivilStatus',
        on_delete=models.CASCADE,
        verbose_name=_('Civil Status'),
        null=True,
        blank=True,
    )
    invited_by = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        verbose_name=_('Invited By'),
        null=True,
        blank=True,
        related_name='invites',
    )
    discipleships = models.ManyToManyField(
        'pmm.Discipleship',
        through='pmm.PersonDiscipleship',
        through_fields=('disciple', 'discipleship'),
        verbose_name=_('Discipleships'),
    )
    family = models.ManyToManyField(
        'self',
        through='pmm.Family',
        through_fields=('person', 'family'),
        verbose_name=_('Relatives'),
        symmetrical=False,
    )

    def __str__(self):
        return self.first_name + ' ' + self.last_name
