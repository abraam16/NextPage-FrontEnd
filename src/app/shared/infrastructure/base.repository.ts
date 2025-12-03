/**
 * Shared - Infrastructure - Base Repository
 * Repositorio base para operaciones HTTP
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseRepository<T> {
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  protected getUrl(path: string = ''): string {
    return `${environment.apiUrl}${this.endpoint}${path}`;
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl());
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(this.getUrl(`/${id}`));
  }

  create(entity: Partial<T>): Observable<T> {
    return this.http.post<T>(this.getUrl(), entity);
  }

  update(id: number, entity: Partial<T>): Observable<T> {
    return this.http.put<T>(this.getUrl(`/${id}`), entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.getUrl(`/${id}`));
  }

  findWithParams(params: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl(), { params });
  }
}
