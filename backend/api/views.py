from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def publico(request):
    """Endpoint publico: cualquier persona puede consumirlo, sin token."""
    data = {
        'mensaje': 'acceso publico'
    }
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def privado(request):
    """Endpoint privado: requiere un access token JWT valido."""
    data = {
        'mensaje': 'acceso privado',
        'usuario': request.user.username,
    }
    return Response(data)
