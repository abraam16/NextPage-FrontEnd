# Configuración de Integración Backend - Frontend

## Estado de Conexión

✅ **Frontend Angular** configurado para conectarse al **Backend Spring Boot**

## URLs Configuradas

- **Frontend Angular**: `http://localhost:4200`
- **Backend Spring Boot**: `http://localhost:8080`
- **Base URL API**: `http://localhost:8080/api`

---

## Cambios Realizados

### 1. Environment Configuration (src/environments/environment.ts)
```typescript
apiUrl: 'http://localhost:8080'  // Cambiado de localhost:3000
apiPrefix: '/api'
endpoints: {
  auth: '/api/auth',
  users: '/api/users',
  books: '/api/books',
  borrowings: '/api/borrowings',
  courses: '/api/courses',
  activities: '/api/activities'
}
```

### 2. Auth Service (authentication/application/auth.service.ts)
- ✅ Método `login()` actualizado para recibir JWT token del backend
- ✅ Método `register()` actualizado para usar endpoint `/api/auth/register`
- ✅ Método `getToken()` agregado para obtener el JWT almacenado
- ✅ Token JWT guardado en `localStorage.jwtToken`
- ✅ Logout limpia el token JWT

### 3. User Repository (authentication/infrastructure/user.repository.ts)
- ✅ Método `login()` agregado: `POST /api/auth/login`
- ✅ Método `register()` agregado: `POST /api/auth/register`

### 4. HTTP Interceptor (shared/infrastructure/auth.interceptor.ts)
- ✅ Creado interceptor para agregar automáticamente `Authorization: Bearer {token}` a todas las peticiones
- ✅ Excluye rutas de autenticación (`/api/auth/login` y `/api/auth/register`)
- ✅ Maneja errores 401 (token expirado/inválido) y redirige a login

### 5. App Config (app.config.ts)
- ✅ Interceptor registrado en los providers de la aplicación

---

## Flujo de Autenticación

### Login
1. Usuario envía credenciales a `POST /api/auth/login`
2. Backend responde con:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": { "id": 1, "nombre": "Juan", "email": "...", "role": "alumno" }
   }
   ```
3. Frontend guarda:
   - `localStorage.jwtToken` → Token JWT
   - `localStorage.loggedUser` → Objeto usuario completo
   - `localStorage.nombreUsuario` → Nombre del usuario
   - `localStorage.rolUsuario` → Rol (alumno/profesor/admin)

### Peticiones Autenticadas
- Todas las peticiones a `/api/*` (excepto `/api/auth/*`) incluyen automáticamente:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

### Logout
- Limpia todo el localStorage
- Usuario debe hacer login nuevamente

---

## Endpoints del Backend

### Autenticación (públicos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login de usuario |
| POST | `/api/auth/register` | Registro de usuario |

### Usuarios (requieren autenticación)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar todos los usuarios |
| GET | `/api/users/{id}` | Obtener usuario por ID |
| GET | `/api/users/email/{email}` | Buscar por email |
| PUT | `/api/users/{id}` | Actualizar usuario |
| DELETE | `/api/users/{id}` | Eliminar usuario |

### Libros (GET públicos, modificaciones requieren auth)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/books` | Listar todos los libros |
| GET | `/api/books/{id}` | Obtener libro por ID |
| GET | `/api/books/search/titulo?titulo=...` | Buscar por título |
| GET | `/api/books/search/autor?autor=...` | Buscar por autor |
| POST | `/api/books` | Crear libro |
| PUT | `/api/books/{id}` | Actualizar libro |
| DELETE | `/api/books/{id}` | Eliminar libro |

### Préstamos (requieren autenticación)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/borrowings` | Listar préstamos |
| GET | `/api/borrowings/{id}` | Obtener préstamo |
| POST | `/api/borrowings` | Crear préstamo |
| PUT | `/api/borrowings/{id}` | Actualizar préstamo |
| DELETE | `/api/borrowings/{id}` | Eliminar préstamo |

### Cursos (requieren autenticación)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/courses` | Listar cursos |
| GET | `/api/courses/{id}` | Obtener curso |
| POST | `/api/courses` | Crear curso |
| PUT | `/api/courses/{id}` | Actualizar curso |
| DELETE | `/api/courses/{id}` | Eliminar curso |

### Actividades (requieren autenticación)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/activities` | Listar actividades |
| GET | `/api/activities/{id}` | Obtener actividad |
| POST | `/api/activities` | Crear actividad |
| PUT | `/api/activities/{id}` | Actualizar actividad |
| DELETE | `/api/activities/{id}` | Eliminar actividad |

---

## CORS en el Backend

El backend debe tener configurado CORS para aceptar peticiones desde el frontend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .exposedHeaders("Authorization");
            }
        };
    }
}
```

---

## Pruebas de Conexión

### 1. Iniciar Backend Spring Boot
```bash
# En el proyecto Spring Boot
./mvnw spring-boot:run
# o
java -jar target/nextpage-backend.jar
```

Verificar que esté corriendo en: `http://localhost:8080`

### 2. Iniciar Frontend Angular
```bash
# En el proyecto Angular
npm start
```

Acceder a: `http://localhost:4200`

### 3. Probar Login
1. Ir a `http://localhost:4200/login`
2. Usar credenciales de prueba:
   - **Email**: `alumno@page.com`
   - **Password**: `123456`
3. Verificar en DevTools → Network que la petición va a `http://localhost:8080/api/auth/login`
4. Verificar que el token JWT se guarda en `localStorage`

### 4. Verificar Headers
En DevTools → Network → Seleccionar cualquier petición después de login:
```
Request Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Solución de Problemas

### Error: "CORS policy"
**Problema**: El backend no acepta peticiones desde localhost:4200

**Solución**: Verificar que la configuración CORS en Spring Boot esté correcta y reiniciar el backend.

---

### Error: 401 Unauthorized en peticiones
**Problema**: Token JWT no se está enviando o es inválido

**Solución**: 
1. Verificar que el token esté en `localStorage.jwtToken`
2. Verificar en Network que el header `Authorization` se está enviando
3. Verificar que el token no haya expirado
4. Hacer logout y login nuevamente

---

### Error: "Cannot connect to backend"
**Problema**: El backend no está corriendo

**Solución**: 
1. Verificar que Spring Boot esté corriendo en puerto 8080
2. Probar manualmente: `curl http://localhost:8080/api/books`

---

## Datos de Prueba

### Usuarios Precargados
```json
{
  "email": "alumno@page.com",
  "password": "123456",
  "role": "alumno"
}

{
  "email": "profesor@page.com",
  "password": "123456",
  "role": "profesor"
}

{
  "email": "admin@page.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Next Steps

1. ✅ Backend Spring Boot corriendo en puerto 8080
2. ✅ Frontend Angular configurado para conectarse a localhost:8080
3. ✅ JWT Interceptor implementado
4. ⏳ Probar login y verificar token
5. ⏳ Probar CRUD de libros
6. ⏳ Probar CRUD de usuarios (solo admin)
7. ⏳ Probar préstamos de libros
8. ⏳ Probar dashboards (alumno/profesor)

---

## Comandos Útiles

```bash
# Iniciar JSON Server (YA NO SE USA)
# npm run server

# Iniciar Backend Spring Boot
cd ../nextpage-backend
./mvnw spring-boot:run

# Iniciar Frontend Angular
npm start

# Ver logs del backend
tail -f logs/spring-boot-application.log

# Compilar Frontend para producción
npm run build
```

---

**Estado**: ✅ Configuración completa. Listo para conectar con el backend Spring Boot.
