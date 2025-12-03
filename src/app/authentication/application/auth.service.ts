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
    console.log('🔑 AuthService.login() called');
    return this.userRepository
      .login(credentials)
      .pipe(
        map((response: any) => {
          console.log('📦 Backend response:', response);
          
          if (!response || !response.token) {
            console.error('❌ Invalid response: missing token');
            return { success: false, error: 'Credenciales incorrectas' };
          }
          
          // El backend envía el usuario directamente con el token incluido
          const token = response.token;
          const user = response; // El response completo ES el usuario
          
          console.log('✅ Login successful, saving user and token');
          console.log('👤 User:', user);
          console.log('🔑 Token:', token);
          
          this.saveUser(user, token);
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
    return this.userRepository.register(newUser).pipe(
      map((response: any) => {
        const user = response;
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
    localStorage.removeItem('jwtToken');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private saveUser(user: User, token?: string): void {
    this.currentUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    localStorage.setItem('nombreUsuario', user.nombre);
    localStorage.setItem('rolUsuario', user.role);
    if (token) {
      localStorage.setItem('jwtToken', token);
    }
  }

  private loadUser(): void {
    const saved = localStorage.getItem('loggedUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }
}
