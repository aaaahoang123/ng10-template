import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {appUserLoaded, authTokenChanged, loadUserData, login, loginComplete} from './auth.reducer';
import {catchError, exhaustMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {doNothingAction} from '../../core';

@Injectable()
export class AuthEffects {
  onInitialApp$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        of(authTokenChanged({payload: localStorage.getItem(environment.authStorageKey) || ''}))
      )
    )
  );

  onLoadUserData$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUserData),
      withLatestFrom(this.store),
      exhaustMap(([action, store]) =>
        store.auth.user
          ? of(doNothingAction())
          : this.authService.userData()
              .pipe(map(res => appUserLoaded({payload: res.data})))
      ),
    )
  );

  onLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap((action) => this.authService.login(action.payload)),
      switchMap(res => {
        localStorage.setItem(environment.authStorageKey, res.data.access_token);
        this.router.navigate(['/', 'welcome']);
        this.notify.success('Đăng nhập thành công', 'Chuyển về trang chủ');
        return [
          appUserLoaded({payload: res.data}),
          loginComplete({payload: true}),
          authTokenChanged({payload: res.data.access_token})
        ];
      }),
      catchError(error => of(loginComplete({payload: false, error})))
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly action$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notify: NzNotificationService
  ) {
  }

}
