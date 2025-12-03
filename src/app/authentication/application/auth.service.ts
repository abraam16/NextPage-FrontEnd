/**
 * Authentication Context - Application - Auth Service
 */

import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UserRepository } from '../infrastructure/user.repository';
import { LoginCredentials, AuthResult } from '../domain/auth.model';
import { User } from '../../shared/domain/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private userRepository: UserRepository) {
    this.loadUser();
  }

  login(credentials: LoginCredentials): Observable<AuthResult> {
    return this.userRepository
      .findByEmailAndPassword(credentials.email, credentials.password)
      .pipe(
        map((users: User[]) => {
          if (users.length === 0) {
            return { success: false, error: 'Credenciales incorrectas' };
          }
          const user = users[0];
          this.saveUser(user);
          return { success: true, user };
        })
      );
  }

  register(userData: Partial<User>): Observable<User> {
    const newUser: Partial<User> = {
      ...userData,
      fechaRegistro: new Date().toISOString().split('T')[0],
      activo: true,
      puntos: userData.role === 'alumno' ? 0 : undefined
    };
    return this.userRepository.create(newUser).pipe(
      map(user => {
        this.saveUser(user);
        return user;
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rolUsuario');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private saveUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    localStorage.setItem('nombreUsuario', user.nombre);
    localStorage.setItem('rolUsuario', user.role);
  }

  private loadUser(): void {
    const saved = localStorage.getItem('loggedUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }
}
