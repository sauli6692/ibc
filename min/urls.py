from django.conf.urls import url, include
from rest_framework import routers

from min import views

app_name = 'min'

router = routers.DefaultRouter()
router.register(r'ministries', views.MinistryViewSet)
router.register(
    r'ministries/(?P<ministry>\d+)/objectives',
    views.MinistryObjectiveViewSet,
    base_name='ministry-objective'
)

urlpatterns = [
    url(r'^(?i)', include(router.urls)),
    url(r'^(?i)ministries/(?P<ministry>\d+)/members', views.MinistryMemberView.as_view(), name='ministry-member'),
    url(r'^(?i)ministries/(?P<ministry>\d+)/leaders', views.MinistryLeaderView.as_view(), name='ministry-leader'),
]
