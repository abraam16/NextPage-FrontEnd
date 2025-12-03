# NextPage Library - Frontend

Sistema de gestión de biblioteca digital para instituciones educativas, implementado con **Domain-Driven Design (DDD)** y **Bounded Contexts**.

## Tecnologías

- **Angular 20** - Framework frontend
- **TypeScript 5.8** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva
- **JSON Server 0.17.4** - API REST mock
- **Standalone Components** - Arquitectura moderna de Angular
- **SCSS/CSS** - Estilos

## Instalación

```powershell
npm install
```

## Ejecución

### Opción 1: Ejecutar todo (Recomendado)
```powershell
npm run dev
```
Inicia automáticamente:
- Frontend en http://localhost:4200
- Backend Mock API en http://localhost:3000

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```powershell
npm run server
```

**Terminal 2 - Frontend:**
```powershell
npm start
```

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

**Base URL**: `http://localhost:3000`

### Usuarios
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `GET /users?email=X&password=Y` - Autenticar

### Libros
- `GET /books` - Listar libros
- `GET /books/:id` - Obtener libro
- `POST /books` - Crear libro
- `PUT /books/:id` - Actualizar libro
- `DELETE /books/:id` - Eliminar libro
- `GET /books?disponible=true` - Libros disponibles

### Préstamos
- `GET /borrowings` - Listar préstamos
- `GET /borrowings/:id` - Obtener préstamo
- `POST /borrowings` - Crear préstamo
- `PUT /borrowings/:id` - Actualizar préstamo
- `DELETE /borrowings/:id` - Eliminar préstamo

### Cursos
- `GET /courses` - Listar cursos
- `GET /courses/:id` - Obtener curso
- `POST /courses` - Crear curso

### Actividades
- `GET /activities` - Listar actividades
- `GET /activities/:id` - Obtener actividad
- `POST /activities` - Crear actividad

## Servicios y Repositorios

### Servicios de Aplicación

```typescript
// Authentication Service
import { AuthService } from './authentication/application/auth.service';

// Métodos disponibles:
authService.login({ email, password })
authService.register(userData)
authService.logout()
authService.getCurrentUser()
authService.isLoggedIn()

// Catalog Service
import { CatalogService } from './library/application/catalog.service';

// Métodos disponibles:
catalogService.getAllBooks()
catalogService.getBookById(id)
catalogService.getAvailableBooks()
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
import { BookRepository } from './library/infrastructure/book.repository';
import { BorrowingRepository } from './library/infrastructure/borrowing.repository';
import { CourseRepository } from './academic/infrastructure/course.repository';
import { ActivityRepository } from './academic/infrastructure/activity.repository';
```

## Datos de Prueba

El archivo `server/db.json` contiene:

- **3 usuarios**: 1 alumno, 1 profesor, 1 administrador
- **18 libros**: Diversos géneros (Ficción, Misterio, Fantasía, etc.)
- **3 préstamos activos**
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
