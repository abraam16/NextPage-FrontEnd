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
}
