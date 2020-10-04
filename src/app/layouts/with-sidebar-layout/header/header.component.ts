import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.interface';
import {logout, RouterEnum} from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  RouterEnum = RouterEnum;

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(state => state.auth.user)
    );
  }

  logout(): void {
    logout();
  }

}
