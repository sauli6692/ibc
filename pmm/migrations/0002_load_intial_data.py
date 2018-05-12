# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-04-28 17:53
from __future__ import unicode_literals

from django.db import migrations
from django.contrib.auth.hashers import make_password
from django.core.management import call_command


def forwards_func(apps, schema_editor):
    fixtures = ['001_discipleships', '002_lessons', '003_lookup_tables', '004_user']
    for fixture in fixtures:
        call_command('loaddata', fixture, app_label='pmm')

def reverse_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    Person = apps.get_model("pmm", "Person")
    Discipleship = apps.get_model('pmm', 'Discipleship')

    Person.objects.using(db_alias).filter(first_name='Admin', last_name='Admin').delete()

    Discipleship.objects.using(db_alias).filter(name__in=[seed['name'] for seed in discipleship_seeds]).delete()

    for model, values in lookup_tables_seeds.items():
        Model = apps.get_model('pmm', model)
        Model.objects.filter(value__in=values).delete()

    with schema_editor.connection.cursor() as cursor:
        cursor.execute('ALTER SEQUENCE core_user_id_seq RESTART WITH 1;')
        cursor.execute("UPDATE core_user SET id=nextval('core_user_id_seq');")
        cursor.execute('ALTER SEQUENCE pmm_person_id_seq RESTART WITH 1;')
        cursor.execute("UPDATE pmm_person SET id=nextval('pmm_person_id_seq');")

        cursor.execute('ALTER SEQUENCE pmm_discipleship_id_seq RESTART WITH 1;')
        cursor.execute("UPDATE pmm_discipleship SET id=nextval('pmm_discipleship_id_seq');")
        cursor.execute('ALTER SEQUENCE pmm_lesson_id_seq RESTART WITH 1;')
        cursor.execute("UPDATE pmm_lesson SET id=nextval('pmm_lesson_id_seq');")


class Migration(migrations.Migration):

    dependencies = [
        ('pmm', '0001_initial'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
