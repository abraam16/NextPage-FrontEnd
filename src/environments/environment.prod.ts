/**
 * Environment Configuration - Production
 * Configuración del entorno de producción
 */

export const environment = {
  production: true,
  apiUrl: 'https://api.nextpage.com',
  apiPrefix: '/api',
  endpoints: {
    users: '/users',
    books: '/books',
    borrowings: '/borrowings',
    courses: '/courses',
    activities: '/activities',
    stats: '/stats'
  }
};
