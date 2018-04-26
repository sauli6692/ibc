from django.db import models
from django.utils.translation import ugettext_lazy as _

from core.models.custom_fields import FixedCharField
from core.models.mixins import DirectionMixin


class Person(DirectionMixin):
    class Meta:
        verbose_name = _('Persona')
        verbose_name_plural = _('Personas')

    gender_choices = (
        ('M', _('Masculino')),
        ('F', _('Femenino')),
    )

    first_name = models.CharField(_('Nombre'), max_length=50)
    last_name = models.CharField(_('Apellido'), max_length=50)
    birthday = models.DateField(_('Cumpleaños'), null=True)
    new_birthday = models.DateField(_('Nuevo Nacimiento'), null=True)
    gender = FixedCharField(_('Género'), max_length=1, choices=gender_choices, default='M')
    baptized = models.BooleanField(_('Bautizado'))
    last_visit = models.DateField(_('Ultima Visita'), null=True)
    integration_level = models.ForeignKey(
        'pmm.IntegrationLevel',
        on_delete=models.CASCADE,
        verbose_name=_('Nivel de Integración'),
        null=True
    )
    occupation = models.ForeignKey(
        'pmm.Occupation',
        on_delete=models.CASCADE,
        verbose_name=_('Ocupación'),
        null=True
    )
    civil_status = models.ForeignKey(
        'pmm.CivilStatus',
        on_delete=models.CASCADE,
        verbose_name=_('Estado Civil'),
        null=True
    )
    invited_by = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        verbose_name=_('Invitado por'),
        null=True,
        related_name='invites',
    )
    discipleships = models.ManyToManyField(
        'pmm.Discipleship',
        through='pmm.PersonDiscipleship',
        through_fields=('disciple', 'discipleship'),
        verbose_name=_('Discipulados'),
    )
    family = models.ManyToManyField(
        'self',
        through='pmm.Family',
        through_fields=('person', 'family'),
        verbose_name=_('Familares'),
        symmetrical=False,
    )
