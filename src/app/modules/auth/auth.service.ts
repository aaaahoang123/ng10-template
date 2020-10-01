import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user.interface';
import {Rest} from '../../models/rest.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  login(value): Observable<Rest<User>> {
    return this.http
      .post<Rest<User>>(`${environment.baseUrl}/get-access-token`, value);
      // .pipe(
      //   map(res => {
      //     localStorage.setItem(ACCESS_TOKEN_SECRET_KEY, res.data.access_token);
      //     return res.data;
      //   }),
      // );
  }

  userData(): Observable<Rest<User>> {
    return this.http.get<Rest<User>>(`${environment.baseUrl}/account`);
  }
}
