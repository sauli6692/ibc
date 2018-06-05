from rest_framework import routers

from rte import views

app_name = 'rte'

router = routers.DefaultRouter()
router.register(r'routes', views.RouteViewSet)
router.register(r'collaborators', views.CollaboratorViewSet)
router.register(r'harvests', views.HarvestViewSet)
router.register(
    r'harvests/(?P<harvest>\d+)/visits',
    views.HarvestVisitViewSet,
    base_name='harvest-visits'
)
router.register(
    r'collaborators/(?P<collaborator>\d+)/visits',
    views.CollaboratorVisitViewSet,
    base_name='collaborator-visits'
)

urlpatterns = router.urls
