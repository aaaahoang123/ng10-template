import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from './app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {appUserLoaded, initialApplication} from './auth.reducer';
import {exhaustMap, map} from 'rxjs/operators';
import {AuthService} from './modules/shared/services/auth/auth.service';

@Injectable()
export class AuthEffect {
  onInitialApp$ = createEffect(() =>
    this.action$.pipe(
      ofType(initialApplication),
      exhaustMap(() =>
        this.authService.userData().pipe(
          map(res => appUserLoaded(res.data))
        )
      )
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly action$: Actions,
    private readonly authService: AuthService
  ) {}

}
