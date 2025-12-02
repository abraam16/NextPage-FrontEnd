// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

export type Role = 'alumno' | 'profesor' | 'otro';

export interface User {
  nombre: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {

    // 🔥 AGREGADO: Restaurar sesión desde localStorage si existe
    const saved = localStorage.getItem('loggedUser');
    if (saved) {
      this.loggedInUser = JSON.parse(saved);
    }

    // Tus usuarios de prueba (NO modifiqué nada)
    this.users = [
      { nombre: 'Alumno1', email: 'alumno@page.com', password: '123456', role: 'alumno' },
      { nombre: 'Profesor1', email: 'profesor@page.com', password: '123456', role: 'profesor' },
      { nombre: 'Admin', email: 'admin@page.com', password: '123456', role: 'otro' }
    ];
  }

  register(user: User): boolean {
    const exists = this.users.some(u => u.email === user.email);
    if (exists) return false;
    this.users.push(user);
    return true;
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) this.loggedInUser = user;
    return user || null;
  }

  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedUser'); // 🔥 AGREGADO: limpiar sesión también
  }

  getCurrentUser(): User | null {
    return this.loggedInUser;
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }
}
