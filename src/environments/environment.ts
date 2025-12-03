/**
 * Environment Configuration - Development
 * Configuración del entorno de desarrollo
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  apiPrefix: '/api',
  endpoints: {
    auth: '/api/auth',
    users: '/api/users',
    books: '/api/books',
    borrowings: '/api/borrowings',
    courses: '/api/courses',
    activities: '/api/activities'
  }
};
