# Lista de capturas para el documento Word / PDF

Guarda aquí tus imágenes y pégalas en el informe. Orden sugerido:

## Codigo (VS Code)
1. Explorador con `lab15/backend` y `lab15/frontend`.
2. `backend/backend/settings.py`: INSTALLED_APPS, REST_FRAMEWORK, MIDDLEWARE y CORS.
3. `backend/api/views.py`: `publico` y `privado` con `IsAuthenticated`.
4. `backend/api/urls.py` + `backend/backend/urls.py`: rutas y endpoints de token.
5. Terminal: `pip install -r requirements.txt`, `migrate`, `createsuperuser`, `runserver`.
6. `frontend/src/api.js` y `frontend/src/components/ProtectedRoute.jsx`.

## Ejecucion (Postman)
7. `POST http://127.0.0.1:8000/api/token/` -> 200 con `access` y `refresh`.
8. `GET http://127.0.0.1:8000/api/publico` sin token -> 200 "acceso publico".
9. `GET http://127.0.0.1:8000/api/privado` sin token -> 401 Unauthorized.
10. `GET http://127.0.0.1:8000/api/privado` con `Authorization: Bearer <access>` -> 200.
11. `POST http://127.0.0.1:8000/api/token/refresh/` -> nuevo `access`.

## Ejecucion (React - navegador)
12. Login -> vista privada con el mensaje del servidor.
13. DevTools > Application > Local Storage -> claves `access` y `refresh`.
14. Cerrar sesion -> las claves desaparecen y redirige a `/login`.
15. Escribir `/privado` en la barra de direcciones sin token -> redirige al login.

## GitHub
16. Repositorio en GitHub con los archivos del laboratorio.
