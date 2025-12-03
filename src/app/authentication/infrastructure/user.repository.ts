/**
 * Authentication Context - Infrastructure - User Repository
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../shared/infrastructure/base.repository';
import { User } from '../../shared/domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends BaseRepository<User> {
  protected endpoint = environment.endpoints.users;

  constructor(http: HttpClient) {
    super(http);
  }

  findByEmail(email: string): Observable<User[]> {
    const params = new HttpParams().set('email', email);
    return this.findWithParams(params);
  }

  findByEmailAndPassword(email: string, password: string): Observable<User[]> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.findWithParams(params);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const url = `${environment.apiUrl}${environment.endpoints.auth}/login`;
    console.log('🔐 Login URL:', url);
    console.log('📧 Credentials:', { 
      email: credentials.email.trim(), 
      password: '***' 
    });
    return this.http.post(url, {
      email: credentials.email.trim(),
      password: credentials.password.trim()
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  register(userData: Partial<User>): Observable<any> {
    const url = `${environment.apiUrl}${environment.endpoints.auth}/register`;
    console.log('📝 Register URL:', url);
    return this.http.post(url, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
