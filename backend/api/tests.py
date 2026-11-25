from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class SeguridadJWTTests(APITestCase):
    """Pruebas automaticas de los endpoints publico y privado."""

    def setUp(self):
        self.usuario = get_user_model().objects.create_user(
            username='labuser',
            password='LabPass123!',
        )
        self.client = APIClient()

    def test_publico_no_requiere_token(self):
        respuesta = self.client.get('/api/publico')
        self.assertEqual(respuesta.status_code, status.HTTP_200_OK)
        self.assertEqual(respuesta.data['mensaje'], 'acceso publico')

    def test_privado_sin_token_devuelve_401(self):
        respuesta = self.client.get('/api/privado')
        self.assertEqual(respuesta.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_privado_con_token_devuelve_200(self):
        token = self.client.post(
            '/api/token/',
            {'username': 'labuser', 'password': 'LabPass123!'},
        )
        self.assertEqual(token.status_code, status.HTTP_200_OK)
        self.assertIn('access', token.data)
        self.assertIn('refresh', token.data)

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token.data['access'])
        respuesta = self.client.get('/api/privado')
        self.assertEqual(respuesta.status_code, status.HTTP_200_OK)
        self.assertEqual(respuesta.data['mensaje'], 'acceso privado')
        self.assertEqual(respuesta.data['usuario'], 'labuser')

    def test_refresh_genera_nuevo_access(self):
        token = self.client.post(
            '/api/token/',
            {'username': 'labuser', 'password': 'LabPass123!'},
        )
        refresh = self.client.post(
            '/api/token/refresh/',
            {'refresh': token.data['refresh']},
        )
        self.assertEqual(refresh.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh.data)
