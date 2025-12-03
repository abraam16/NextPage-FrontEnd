/**
 * Library Context - Infrastructure - Borrowing Repository
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../shared/infrastructure/base.repository';
import { Borrowing } from '../../shared/domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowingRepository extends BaseRepository<Borrowing> {
  protected endpoint = environment.endpoints.borrowings;

  constructor(http: HttpClient) {
    super(http);
  }

  findByUserId(usuarioId: number): Observable<Borrowing[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.findWithParams(params);
  }
}
