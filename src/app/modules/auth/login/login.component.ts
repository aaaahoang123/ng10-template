import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {createForm, dirtyForm, logout} from '../../../common';
import {LoginForm} from './login.form';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {login} from '../auth.reducer';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  domain = environment.domain;
  loading$: Observable<boolean>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (!this.route.snapshot.queryParams.hashed_token) {
      logout();
    }

    this.validateForm = createForm(new LoginForm()) as FormGroup;

    this.loading$ = this.store.pipe(
      select(state => state.auth.loginFormLoading)
    );
  }

  submitForm(): void {
    dirtyForm(this.validateForm);
    if (this.validateForm.invalid) {
      return;
    }
    this.store.dispatch(login({
      payload: {
        ...this.validateForm.value,
        hashed_token: this.route.snapshot.queryParams.hashed_token
      }
    }));
  }

}
