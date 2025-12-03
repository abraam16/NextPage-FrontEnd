/**
 * Academic Context - Infrastructure - Activity Repository
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../shared/infrastructure/base.repository';
import { Activity } from '../../shared/domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityRepository extends BaseRepository<Activity> {
  protected endpoint = environment.endpoints.activities;

  constructor(http: HttpClient) {
    super(http);
  }

  findByTeacher(profesorId: number): Observable<Activity[]> {
    const params = new HttpParams().set('profesorId', profesorId.toString());
    return this.findWithParams(params);
  }
}
