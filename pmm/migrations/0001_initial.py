# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-04-24 05:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CivilStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=50, verbose_name='Valor')),
            ],
            options={
                'verbose_name': 'Estado Civil',
                'verbose_name_plural': 'Estados Civiles',
            },
        ),
        migrations.CreateModel(
            name='FamilyRelationship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=50, verbose_name='Valor')),
            ],
            options={
                'verbose_name': 'Relación familiar',
                'verbose_name_plural': 'Relaciones familiares',
            },
        ),
        migrations.CreateModel(
            name='IntegrationLevel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=50, verbose_name='Valor')),
            ],
            options={
                'verbose_name': 'Nivel de integración',
                'verbose_name_plural': 'Niveles de integración',
            },
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=50, verbose_name='Valor')),
            ],
            options={
                'verbose_name': 'Ocupación',
                'verbose_name_plural': 'Ocupaciones',
            },
        ),
    ]
