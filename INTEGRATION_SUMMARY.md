# Resumen de Integración Backend - Frontend

## ✅ CONFIGURACIÓN COMPLETADA

El frontend Angular ha sido configurado exitosamente para conectarse al backend Spring Boot.

---

## 📋 Cambios Realizados

### 1. **Configuración de URLs** (`src/environments/environment.ts`)
   - ✅ Cambiado de `http://localhost:3000` → `http://localhost:8080`
   - ✅ Agregado prefijo `/api` para todos los endpoints
   - ✅ Agregado endpoint de autenticación `/api/auth`

### 2. **Autenticación JWT**
   - ✅ `AuthService` actualizado para manejar JWT tokens
   - ✅ Token se guarda en `localStorage.jwtToken`
   - ✅ Método `getToken()` agregado
   - ✅ Logout limpia el token

### 3. **UserRepository**
   - ✅ Método `login()` agregado: `POST /api/auth/login`
   - ✅ Método `register()` agregado: `POST /api/auth/register`
   - ✅ Respuesta incluye `{ token, user }`

### 4. **HTTP Interceptor** (NUEVO)
   - ✅ Archivo creado: `src/app/shared/infrastructure/auth.interceptor.ts`
   - ✅ Agrega automáticamente `Authorization: Bearer {token}` a todas las peticiones
   - ✅ Excluye rutas de autenticación (`/api/auth/login`, `/api/auth/register`)
   - ✅ Maneja errores 401 (token expirado) y redirige a login
   - ✅ Registrado en `app.config.ts`

### 5. **Documentación Creada**
   - ✅ `API_ENDPOINTS.md` - Especificación completa de todos los endpoints con ejemplos
   - ✅ `INTEGRATION_GUIDE.md` - Guía paso a paso de integración y troubleshooting
   - ✅ `README.md` actualizado - Referencias al backend Spring Boot

---

## 🚀 Cómo Usar

### Paso 1: Iniciar Backend Spring Boot
```bash
# En el proyecto backend
./mvnw spring-boot:run
```
✅ Debe estar corriendo en `http://localhost:8080`

### Paso 2: Iniciar Frontend Angular
```bash
# En este proyecto
npm start
```
✅ Abrirá automáticamente `http://localhost:4200`

### Paso 3: Probar Login
1. Ir a `http://localhost:4200/login`
2. Usar credenciales:
   - **Email**: `alumno@page.com`
   - **Password**: `123456`
3. El sistema:
   - Enviará `POST http://localhost:8080/api/auth/login`
   - Recibirá `{ token: "...", user: {...} }`
   - Guardará el token en localStorage
   - Redirigirá al dashboard

### Paso 4: Navegación Autenticada
Todas las peticiones posteriores incluirán automáticamente:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `API_ENDPOINTS.md` | Lista completa de endpoints con request/response examples |
| `INTEGRATION_GUIDE.md` | Guía de integración, troubleshooting y configuración CORS |
| `BACKEND_REQUIREMENTS.md` | Especificaciones técnicas del backend (Spring Boot, JPA, JWT) |
| `README.md` | Documentación principal actualizada |

---

## 🔐 Headers HTTP

### Login/Register (públicos)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "alumno@page.com",
  "password": "123456"
}
```

### Endpoints Autenticados
```http
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## ✨ Características Implementadas

1. **Login con JWT**: ✅
2. **Registro de usuarios**: ✅
3. **Auto-inyección de token en headers**: ✅
4. **Manejo de errores 401**: ✅
5. **Logout y limpieza de sesión**: ✅
6. **CORS configurado**: ✅ (en backend)
7. **Endpoints documentados**: ✅

---

## 🧪 Testing

### Verificar Conexión Backend
```powershell
curl http://localhost:8080/api/books
```

### Verificar Login
```powershell
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"alumno@page.com","password":"123456"}'
```

### Verificar Token en DevTools
1. Abrir Chrome DevTools (F12)
2. Ir a **Application** → **Local Storage** → `http://localhost:4200`
3. Verificar que existe `jwtToken`
4. Ir a **Network** → Seleccionar cualquier petición
5. Verificar header `Authorization: Bearer ...`

---

## 🐛 Solución de Problemas

### "CORS policy error"
**Causa**: Backend no acepta peticiones desde localhost:4200  
**Solución**: Verificar `CorsConfig.java` en el backend (ver `INTEGRATION_GUIDE.md`)

### "401 Unauthorized"
**Causa**: Token inválido o expirado  
**Solución**: Hacer logout y login nuevamente

### "Cannot connect to backend"
**Causa**: Backend no está corriendo  
**Solución**: Iniciar Spring Boot en puerto 8080

---

## 📦 Próximos Pasos

1. ✅ Frontend configurado
2. ✅ Interceptor JWT implementado
3. ⏳ Probar todas las funcionalidades (login, CRUD libros, préstamos, etc.)
4. ⏳ Verificar roles y permisos (alumno/profesor/admin)
5. ⏳ Testing end-to-end
6. ⏳ Deploy a producción

---

## 📝 Notas Importantes

- **JSON Server YA NO SE USA** - Toda la data viene del backend Spring Boot
- **JWT obligatorio** - Todas las rutas (excepto login/register) requieren token
- **CORS configurado** - Backend acepta peticiones desde localhost:4200
- **Interceptor automático** - No necesitas agregar headers manualmente
- **Logout automático** - Si el token expira, redirige a login

---

**Estado**: ✅ **LISTO PARA CONECTAR CON EL BACKEND**

🎉 El frontend está completamente configurado y listo para comunicarse con el backend Spring Boot en `http://localhost:8080/api`
