import os
import json

from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission


class Command(BaseCommand):
    args = '#'
    help = """Command to populate the Groups permissions (check ibc/static/jsons/groups_permissions.json),
        to control the different user accesses."""

    def handle(self, *args, **options):
        file = os.path.join(settings.STATIC_ROOT, 'jsons', 'groups_permissions.json')

        with open(file) as json_data:
            data = json.load(json_data)

            for group_name, permissions in data['groups'].items():
                group = Group(name=group_name)
                group.save()
                group.permissions.add(*self.__get_permissions(permissions, data['permissions_map']))

        self.stdout.write('Groups permissions created.')

    def __get_permissions(self, permissions, permissions_map):
        codenames = []
        for model, _permissions in permissions.items():
            for perm in _permissions:
                codenames.append('{}_{}'.format(permissions_map[perm], model))

        return Permission.objects.filter(codename__in=codenames)
