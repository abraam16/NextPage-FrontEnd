/**
 * Shared - Domain Models
 * Modelos de dominio compartidos
 */

export type UserRole = 'alumno' | 'profesor' | 'admin';

export interface User {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  password?: string;
  role: UserRole;
  puntos?: number;
  materia?: string;
  cursoId?: number;
  permisos?: string[];
  fechaRegistro: string;
  activo: boolean;
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  isbn?: string;
  disponible: boolean;
  rating: number;
  descripcion: string;
  portada: string;
  stockTotal?: number;
  stockDisponible?: number;
  añoPublicacion?: number;
  editorial?: string;
}

export interface Borrowing {
  id: number;
  usuarioId: number;
  libroId: number;
  fechaPrestamo: string;
  fechaDevolucionEsperada: string;
  fechaDevolucionReal: string | null;
  estado: 'activo' | 'devuelto' | 'vencido';
  progreso: number;
  renovaciones: number;
}

export interface Course {
  id: number;
  nombre: string;
  nivel: string;
  grado: number;
  profesorId: number;
  totalAlumnos: number;
  promedioLectura: number;
  añoEscolar: string;
  activo: boolean;
}

export interface Activity {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  cursoId: number;
  profesorId: number;
  fechaCreacion: string;
  fechaLimite: string;
  estado: string;
  entregas: number;
  totalAlumnos: number;
}
