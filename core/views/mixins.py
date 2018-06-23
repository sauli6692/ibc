class CreateListMixin:
    """Mixin que permite recibir un arreglo JSON para realizar batch create."""

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)
