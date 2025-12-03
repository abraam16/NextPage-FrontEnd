# NextPage Library - Frontend

Sistema de gestión de biblioteca digital para instituciones educativas, implementado con **Domain-Driven Design (DDD)** y **Bounded Contexts**.

## Tecnologías

- **Angular 20** - Framework frontend
- **TypeScript 5.8** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva
- **Spring Boot** - Backend API REST (puerto 8080)
- **JWT Authentication** - Autenticación segura
- **Standalone Components** - Arquitectura moderna de Angular
- **SCSS/CSS** - Estilos

## Instalación

```powershell
npm install
```

## Ejecución

### Prerrequisitos
1. **Backend Spring Boot** debe estar corriendo en `http://localhost:8080`
2. Ver [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) para detalles de conexión

### Iniciar Frontend
```powershell
npm start
```

El frontend estará disponible en: `http://localhost:4200`

### Backend API
- **Base URL**: `http://localhost:8080/api`
- **Autenticación**: JWT Bearer Token
- Ver [API_ENDPOINTS.md](API_ENDPOINTS.md) para documentación completa de endpoints

## Usuarios de Prueba

| Rol | Email | Password |
|-----|-------|----------|
| Alumno | `alumno@page.com` | `123456` |
| Profesor | `profesor@page.com` | `123456` |
| Admin | `admin@page.com` | `123456` |

## Arquitectura DDD

El proyecto sigue **Domain-Driven Design** con **Bounded Contexts** bien definidos:

```
src/app/
├── authentication/              # Bounded Context: Autenticación
│   ├── application/
│   │   └── auth.service.ts      # Casos de uso de autenticación
│   ├── domain/
│   │   └── auth.model.ts        # Modelos de dominio (LoginCredentials, AuthResult)
│   ├── infrastructure/
│   │   └── user.repository.ts   # Acceso a datos de usuarios
│   └── presentation/
│       ├── login/               # Página de inicio de sesión
│       └── registro/            # Página de registro
│
├── library/                     # Bounded Context: Biblioteca
│   ├── application/
│   │   └── catalog.service.ts   # Lógica de negocio del catálogo
│   ├── infrastructure/
│   │   ├── book.repository.ts       # Repositorio de libros
│   │   └── borrowing.repository.ts  # Repositorio de préstamos
│   └── presentation/
│       ├── home/                    # Página principal
│       ├── catalogo/                # Catálogo de libros
│       ├── admin-panel/             # Panel de administración
│       └── student-dashboard/       # Dashboard de estudiante
│
├── academic/                    # Bounded Context: Académico
│   ├── infrastructure/
│   │   ├── course.repository.ts     # Repositorio de cursos
│   │   └── activity.repository.ts   # Repositorio de actividades
│   └── presentation/
│       └── teacher-dashboard/       # Dashboard de profesor
│
└── shared/                      # Shared Kernel
    ├── domain/
    │   └── models.ts                # Modelos compartidos (User, Book, etc.)
    ├── infrastructure/
    │   └── base.repository.ts       # Repositorio genérico base
    └── presentation/
        ├── navbar/                  # Barra de navegación
        └── footer/                  # Pie de página
```

### Capas DDD

Cada Bounded Context sigue la estructura de capas:

1. **Presentation** - Componentes de UI (páginas, formularios)
2. **Application** - Servicios de aplicación (casos de uso)
3. **Domain** - Modelos de dominio (entidades, value objects)
4. **Infrastructure** - Repositorios (acceso a datos, APIs)

## Bounded Contexts

### Authentication Context
**Responsabilidad**: Gestión de usuarios y autenticación
- Login/Logout
- Registro de usuarios
- Gestión de sesiones (localStorage)
- Validación de credenciales

### Library Context
**Responsabilidad**: Gestión del catálogo de libros y préstamos
- Catálogo de libros
- Búsqueda y filtrado
- Préstamos de libros
- Panel de administración
- Dashboard de estudiantes

### Academic Context
**Responsabilidad**: Gestión académica
- Cursos
- Actividades
- Dashboard de profesores
- Seguimiento de progreso

### Shared Kernel
**Responsabilidad**: Código compartido entre contextos
- Modelos comunes (User, Book, Borrowing, Course, Activity)
- BaseRepository genérico
- Componentes de UI reutilizables (navbar, footer)

## API Endpoints

**Base URL**: `http://localhost:8080/api`

Ver documentación completa en [API_ENDPOINTS.md](API_ENDPOINTS.md)

### Autenticación (públicos)
- `POST /api/auth/login` - Login con JWT
- `POST /api/auth/register` - Registro de usuario

### Usuarios (requieren autenticación)
- `GET /api/users` - Listar usuarios
- `GET /api/users/{id}` - Obtener usuario
- `GET /api/users/email/{email}` - Buscar por email
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

### Libros (GET públicos, POST/PUT/DELETE requieren auth)
- `GET /api/books` - Listar libros
- `GET /api/books/{id}` - Obtener libro
- `GET /api/books/search/titulo?titulo=...` - Buscar por título
- `GET /api/books/search/autor?autor=...` - Buscar por autor
- `POST /api/books` - Crear libro
- `PUT /api/books/{id}` - Actualizar libro
- `DELETE /api/books/{id}` - Eliminar libro

### Préstamos (requieren autenticación)
- `GET /api/borrowings` - Listar préstamos
- `GET /api/borrowings/{id}` - Obtener préstamo
- `POST /api/borrowings` - Crear préstamo
- `PUT /api/borrowings/{id}` - Actualizar préstamo
- `DELETE /api/borrowings/{id}` - Eliminar préstamo

### Cursos (requieren autenticación)
- `GET /api/courses` - Listar cursos
- `GET /api/courses/{id}` - Obtener curso
- `POST /api/courses` - Crear curso
- `PUT /api/courses/{id}` - Actualizar curso
- `DELETE /api/courses/{id}` - Eliminar curso

### Actividades (requieren autenticación)
- `GET /api/activities` - Listar actividades
- `GET /api/activities/{id}` - Obtener actividad
- `POST /api/activities` - Crear actividad
- `PUT /api/activities/{id}` - Actualizar actividad
- `DELETE /api/activities/{id}` - Eliminar actividad

## Servicios y Repositorios

### Servicios de Aplicación

```typescript
// Authentication Service
import { AuthService } from './authentication/application/auth.service';

// Métodos disponibles:
authService.login({ email, password }) // Retorna JWT token
authService.register(userData)
authService.logout()
authService.getCurrentUser()
authService.getToken() // Obtener JWT token
authService.isLoggedIn()

// Catalog Service
import { CatalogService } from './library/application/catalog.service';

// Métodos disponibles:
catalogService.getAllBooks()
catalogService.searchBooks(searchTerm, genero)
catalogService.getUniqueGenres()
```

### Repositorios

Todos los repositorios extienden `BaseRepository<T>` con métodos CRUD genéricos:

```typescript
// Métodos disponibles en todos los repositorios:
findAll(): Observable<T[]>
findById(id: number): Observable<T>
create(entity: Partial<T>): Observable<T>
update(id: number, entity: Partial<T>): Observable<T>
delete(id: number): Observable<void>
findWithParams(params: HttpParams): Observable<T[]>

// Repositorios específicos:
import { UserRepository } from './authentication/infrastructure/user.repository';
// Métodos adicionales:
userRepository.login({ email, password }) // POST /api/auth/login
userRepository.register(userData) // POST /api/auth/register
userRepository.findByEmail(email)

import { BookRepository } from './library/infrastructure/book.repository';
import { BorrowingRepository } from './library/infrastructure/borrowing.repository';
import { CourseRepository } from './academic/infrastructure/course.repository';
import { ActivityRepository } from './academic/infrastructure/activity.repository';
```

### Autenticación JWT

El sistema usa JWT tokens para autenticación:

1. **Login**: `POST /api/auth/login` retorna `{ token, user }`
2. **Token Storage**: Se guarda en `localStorage.jwtToken`
3. **Auto-Injection**: El `AuthInterceptor` agrega automáticamente el header:
   ```
   Authorization: Bearer {token}
   ```
4. **Logout**: Limpia el token y redirige a login

## Datos de Prueba

Los datos iniciales deben estar en la base de datos del backend:

- **3 usuarios**: 1 alumno, 1 profesor, 1 administrador
- **18 libros**: Diversos géneros (Ficción, Misterio, Fantasía, etc.)
- **3 préstamos activos**
- **3 cursos**
- **3 actividades**

Ver [API_ENDPOINTS.md](API_ENDPOINTS.md) para los datos exactos a cargar.
- **3 cursos**: 5to Secundaria, 4to Secundaria, 1er Bachillerato
- **3 actividades**: Ensayos y cuestionarios

## Comandos Disponibles

```powershell
# Desarrollo
npm start              # Iniciar frontend (puerto 4200)
npm run server         # Iniciar JSON Server (puerto 3000)
npm run dev            # Iniciar ambos simultáneamente

# Build
npm run build          # Build de producción
npm run watch          # Build en modo watch

# Testing
npm test               # Ejecutar tests
```

## Variables de Entorno

Configuración en `src/environments/`:

**environment.ts** (Development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  endpoints: {
    users: '/users',
    books: '/books',
    borrowings: '/borrowings',
    courses: '/courses',
    activities: '/activities'
  }
};
```

**environment.prod.ts** (Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.nextpage.com',
  endpoints: { /* ... */ }
};
```

## Patrones de Diseño Implementados

1. **Repository Pattern** - Abstracción de acceso a datos
2. **Service Layer** - Lógica de negocio separada
3. **Dependency Injection** - Inyección de dependencias de Angular
4. **Observer Pattern** - RxJS Observables para programación reactiva
5. **Generic Repository** - BaseRepository<T> reutilizable
6. **Standalone Components** - Componentes independientes sin módulos

## Seguridad

- Autenticación basada en email/password
- Tokens almacenados en localStorage
- Validación de formularios con Angular Reactive Forms
- Protección de rutas (por implementar guards)

## Funcionalidades

### Para Alumnos
- Ver catálogo de libros
- Buscar y filtrar libros
- Solicitar préstamos
- Ver dashboard personal
- Seguimiento de lectura

### Para Profesores
- Dashboard de profesor
- Gestión de cursos
- Asignación de actividades
- Seguimiento de alumnos

### Para Administradores
- Panel de administración
- Gestión de libros
- Gestión de usuarios
- Estadísticas del sistema

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Autor

**NextPage Team**

---

Si te gusta este proyecto, dale una estrella en GitHub!
