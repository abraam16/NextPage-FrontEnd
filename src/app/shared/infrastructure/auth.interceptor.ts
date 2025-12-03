/**
 * Shared - Infrastructure - Auth Interceptor
 * Interceptor HTTP para agregar JWT token a las peticiones
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('jwtToken');
    
    // No agregar token a las rutas de autenticación
    const isAuthRoute = request.url.includes('/api/auth/login') || 
                        request.url.includes('/api/auth/register');
    
    if (token && !isAuthRoute) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('loggedUser');
          localStorage.removeItem('nombreUsuario');
          localStorage.removeItem('rolUsuario');
          window.location.href = '/login';
        }
        return throwError(() => error);
      })
    );
  }
}
