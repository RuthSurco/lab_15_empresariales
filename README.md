# Laboratorio 15 — Seguridad con JWT en Django y React

**Curso:** Desarrollo de Aplicaciones Empresariales  
**Tema:** Seguridad en una aplicación de comercio electrónico con JSON Web Tokens  
**Docente:** Jean Marco Miranda Llanos  
**Entrega:** viernes 27 de noviembre de 2026, 23:59 — PDF individual (20 puntos)

---

## 1. Qué contiene este proyecto

```
lab15/
├── backend/                 API REST con Django + DRF + SimpleJWT + CORS
│   ├── backend/settings.py  configuracion (JWT, CORS, apps)
│   ├── backend/urls.py      rutas /api/token/, /api/token/refresh/, admin
│   └── api/
│       ├── views.py         endpoints publico y privado
│       ├── urls.py          rutas /api/publico y /api/privado
│       └── tests.py         pruebas automaticas de seguridad
├── frontend/                SPA React (Vite) con login, logout y ruta protegida
│   └── src/
│       ├── api.js           peticiones fetch + localStorage
│       ├── context/AuthContext.jsx
│       ├── components/Login.jsx
│       ├── components/ProtectedRoute.jsx
│       └── pages/{Publico,Privado}.jsx
└── README.md                este archivo
```

**Endpoints**

| Metodo | URL | Requiere token | Respuesta |
|---|---|---|---|
| GET | `/api/publico` | No | `{"mensaje": "acceso publico"}` |
| GET | `/api/privado` | Sí (`Bearer`) | `{"mensaje": "acceso privado", "usuario": "..."}` |
| POST | `/api/token/` | No | `{"access": "...", "refresh": "..."}` |
| POST | `/api/token/refresh/` | Refresh token | `{"access": "..."}` |

---

## 2. Ejecutar el backend

```powershell
cd "D:\semestre 4\desarrollo de aplicaciones empresariales\lab15\backend"
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser      # usuario para probar el login
python manage.py runserver
```

Usuario de prueba que dejé creado localmente: **`labuser`** / **`LabPass123!`**  
(si usas otro, cámbialo en `frontend/src/components/Login.jsx` donde están los placeholders).

Verificacion automatica:

```powershell
python manage.py test
```

---

## 3. Ejecutar el frontend

```powershell
cd "D:\semestre 4\desarrollo de aplicaciones empresariales\lab15\frontend"
npm install
npm run dev
```

Abrir http://localhost:5173

---

## 4. Validar en Postman

1. **POST** `http://127.0.0.1:8000/api/token/` → Body → raw → JSON:
   ```json
   {"username": "labuser", "password": "LabPass123!"}
   ```
   Copiar el valor de `access`.
2. **GET** `http://127.0.0.1:8000/api/publico` → 200, sin token.
3. **GET** `http://127.0.0.1:8000/api/privado` sin token → **401 Unauthorized**.
4. **GET** `http://127.0.0.1:8000/api/privado` → Headers →
   `Authorization: Bearer <access>` → 200.
5. **POST** `http://127.0.0.1:8000/api/token/refresh/` →
   `{"refresh": "<refresh>"}` → nuevo `access`.

---

## 5. Subir a GitHub

```powershell
cd "D:\semestre 4\desarrollo de aplicaciones empresariales\lab15"
git init
git branch -M main
git add .
git commit -m "Lab 15 - Seguridad JWT en Django y React"
git remote add origin https://github.com/TU_USUARIO/lab15-jwt.git
git push -u origin main
```

