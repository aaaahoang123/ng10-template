import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City} from '../../models/regions/city.interface';
import {Observable} from 'rxjs';
import {Rest} from '../../models/rest.interface';
import {District} from '../../models/regions/district.interface';
import {environment} from '../../../environments/environment';
import {Street} from '../../models/regions/street.interface';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private http: HttpClient
  ) { }

  cities(): Observable<Rest<City>> {
    return this.http.get<Rest<City>>(`${environment.baseUrl}/regions/cities`);
  }

  // tslint:disable-next-line
  districts(city_id: any): Observable<Rest<District>> {
    return this.http.get<Rest<District>>(`${environment.baseUrl}/regions/districts`, {params: {city_id}});
  }

  // tslint:disable-next-line
  streets(city_id: number, district_id: number = null): Observable<Rest<Street>> {
    const params: any = {
      city_id,
      district_id: district_id || ''
    };
    return this.http.get<Rest<Street>>(`${environment.baseUrl}/regions/streets`, {params});
  }

  allCities(): Observable<Rest<City>> {
    return this.http.get<Rest<City>>(`${environment.baseUrl}/regions/all-cities`);
  }
}
