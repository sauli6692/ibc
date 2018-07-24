from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework import status

from ..models import UIRoute


class UIRouteView(RetrieveAPIView):
    permission_classes = ()

    def retrieve(self, request, *args, **kwargs):
        if not request.query_params.get('slug', None):
            return Response({
                'message': 'Query param `slug` mandatory'
            }, status.HTTP_400_BAD_REQUEST)

        return Response(self.get_object())

    def get_object(self):
        slug = self.request.query_params.get('slug', '')
        slugs = self.__get_slugs(slug)

        groups = Group.objects.filter(uiroutes__slug__in=slugs).distinct()
        menu = self.__get_menu_item(slug)
        return {
            'roles': groups.values_list('id', flat=True),
            'menu': menu
        }

    def __get_slugs(self, slug):
        sections = slug.split('/')
        slugs = []
        prev = ''
        for i, section in enumerate(sections):
            prev = prev + ('' if i == 0 else '/') + section
            slugs.append(prev)

        return slugs

    def __get_menu_item(self, slug):
        query = UIRoute.objects.filter(parent=slug).values('slug', 'label', 'groups')
        menu = []
        item_groups = {}
        for item in query:
            if item['slug'] not in item_groups:
                item_groups[item['slug']] = []
                menu.append({
                    'slug': item['slug'],
                    'label': item['label'],
                    'roles': item_groups[item['slug']]
                })
            item_groups[item['slug']].append(item['groups'])

        return menu
