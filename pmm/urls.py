from rest_framework import routers

from pmm import views

app_name = 'pmm'

router = routers.DefaultRouter()
router.register(r'discipleships', views.DiscipleshipViewSet)
router.register(r'lessons', views.LessonViewSet)
router.register(r'integration-levels', views.IntegrationLevelViewSet)
router.register(r'occupations', views.OccupationViewSet)
router.register(r'civil-status', views.CivilStatusViewSet)
router.register(r'family-relationships', views.FamilyRelationshipViewSet)
router.register(r'people', views.PersonViewSet)
router.register(r'members', views.MemberViewSet)
router.register(r'families', views.FamilyViewSet)
router.register(
    r'people/(?P<disciple>\d+)/discipleships',
    views.PersonDiscipleshipViewSet,
    base_name='person-discipleship'
)

urlpatterns = router.urls
