/**
 * Environment Configuration - Development
 * Configuración del entorno de desarrollo
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  endpoints: {
    auth: '/auth',
    users: '/users',
    books: '/books',
    borrowings: '/borrowings',
    courses: '/courses',
    activities: '/activities'
  }
};
