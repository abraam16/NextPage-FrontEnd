/**
 * Library Context - Infrastructure - Book Repository
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../shared/infrastructure/base.repository';
import { Book } from '../../shared/domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookRepository extends BaseRepository<Book> {
  protected endpoint = environment.endpoints.books;

  constructor(http: HttpClient) {
    super(http);
  }

  findByGenre(genero: string): Observable<Book[]> {
    const params = new HttpParams().set('genero', genero);
    return this.findWithParams(params);
  }
}
