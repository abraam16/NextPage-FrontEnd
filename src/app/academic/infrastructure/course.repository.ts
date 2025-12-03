/**
 * Academic Context - Infrastructure - Course Repository
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../shared/infrastructure/base.repository';
import { Course } from '../../shared/domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseRepository extends BaseRepository<Course> {
  protected endpoint = environment.endpoints.courses;

  constructor(http: HttpClient) {
    super(http);
  }

  findByTeacher(profesorId: number): Observable<Course[]> {
    const params = new HttpParams().set('profesorId', profesorId.toString());
    return this.findWithParams(params);
  }
}
