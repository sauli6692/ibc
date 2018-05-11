from rest_framework.permissions import DjangoModelPermissions


class BaseModelPermissions(DjangoModelPermissions):
    def __init__(self):
        super(BaseModelPermissions, self).__init__()
        self.perms_map['GET'].append('%(app_label)s.read_%(model_name)s')
