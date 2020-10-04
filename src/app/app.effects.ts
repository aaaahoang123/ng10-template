import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {pushParamsToRouter} from './app.actions';
import {switchMap} from 'rxjs/operators';
import {doNothingAction} from './core';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppEffects {
  onPushParamsToRouter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pushParamsToRouter),
      switchMap(({payload}) => {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: payload,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
        return of(doNothingAction());
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }
}

