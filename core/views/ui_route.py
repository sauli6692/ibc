from django.contrib.auth.models import Group
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework import status


from ..models import UIRoute
from ..serializers import UIRouteSerializer


class UIRouteView(RetrieveAPIView):
    permission_classes = ()
    queryset = UIRoute.objects.all()
    serializer_class = UIRouteSerializer

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

        return [group.pk for group in groups]

    def __get_slugs(self, slug):
        sections = slug.split('/')
        slugs = []
        prev = ''
        for i, section in enumerate(sections):
            prev = prev + ('' if i == 0 else '/') + section
            slugs.append(prev)

        return slugs
