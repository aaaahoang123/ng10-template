import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VehicleCategoryParams} from './vehicle-category.params';
import {Rest} from '../../models/rest.interface';
import {VehicleCategory} from '../../models/vehicle-category.interface';
import {environment} from '../../../environments/environment';
import {filterParams} from '../../core';
import {Observable} from 'rxjs';
import {VehicleCategoryForm} from './vehicle-category.state';

@Injectable({
  providedIn: 'root'
})
export class VehicleCategoryService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(params: VehicleCategoryParams): Observable<Rest<VehicleCategory>> {
    return this.http.get<Rest<VehicleCategory>>(
      `${environment.baseUrl}/vehicles/list-categories`,
      {params: filterParams(params)}
    );
  }

  delete(id: number): Observable<Rest<VehicleCategory>> {
    return this.http.delete<Rest<VehicleCategory>>(
      `${environment.baseUrl}/vehicles/delete-category`,
      {params: {id} as any}
    );
  }

  single(id: number): Observable<Rest<VehicleCategory>> {
    return this.http.get<Rest<VehicleCategory>>(
      `${environment.baseUrl}/vehicles/single-category`,
      {params: {id} as any}
    );
  }

  create(value: VehicleCategoryForm): Observable<Rest<VehicleCategory>> {
    return this.http.post<Rest<VehicleCategory>>(`${environment.baseUrl}/vehicles/create-category`, value);
  }

  edit(id: number, value: VehicleCategoryForm): Observable<Rest<VehicleCategory>> {
    return this.http.put<Rest<VehicleCategory>>(`${environment.baseUrl}/vehicles/edit-category`, {...value, id});
  }
}
