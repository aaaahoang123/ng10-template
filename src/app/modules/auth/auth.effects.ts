import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from '../../app.state';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {appUserLoaded} from './auth.reducer';
import {exhaustMap, map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthEffects {
  onInitialApp$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.authService.userData().pipe(
          map(res => appUserLoaded({payload: res.data}))
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
