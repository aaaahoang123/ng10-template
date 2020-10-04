import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VoyageParams} from './voyage.params';
import {Observable} from 'rxjs';
import {Rest} from '../../models/rest.interface';
import {Voyage} from '../../models/voyages';
import {filterParams, RouterEnum} from '../../core';
import {environment} from '../../../environments/environment';
import {VoyageFormData} from './voyage.state';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  list(requestParams: VoyageParams): Observable<Rest<Voyage>> {
    const params = filterParams(requestParams);
    return this.http.get<Rest<Voyage>>(
      `${environment.baseUrl}/${RouterEnum.voyages}/${RouterEnum.list}`,
      {params}
    );
  }

  single(id: number): Observable<Rest<Voyage>> {
    return this.http.get<Rest<Voyage>>(`${environment.baseUrl}/voyages/single`, { params: { id } as any });
  }

  delete(id: number): Observable<Rest<Voyage>> {
    return this.http
      .delete<Rest<Voyage>>(
        `${environment.baseUrl}/${RouterEnum.voyages}/${RouterEnum.delete}`,
        {params: {id} as any}
      );
  }

  createVoyage(data: VoyageFormData): Observable<Rest<Voyage>> {
    return this.http.post<Rest<Voyage>>(`${environment.baseUrl}/vehicles/create-voyage`, data);
  }

  edit(id: number, data: VoyageFormData): Observable<Rest<Voyage>> {
    return this.http.put<Rest<Voyage>>(`${environment.baseUrl}/voyages/edit/${id}`, data)
  }
}
