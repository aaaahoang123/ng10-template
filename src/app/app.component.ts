import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';
import {initialApplication} from './auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(initialApplication());
  }
}
