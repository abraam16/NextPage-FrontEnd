/**
 * Environment Configuration - Development
 * Configuración del entorno de desarrollo
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  apiPrefix: '',
  endpoints: {
    users: '/users',
    books: '/books',
    borrowings: '/borrowings',
    courses: '/courses',
    activities: '/activities',
    stats: '/stats'
  }
};
