import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RegionService} from './region.service';
import {citiesLoaded, districtsLoaded, loadCities, loadDistrictsOfCity} from './region.reducer';
import {exhaustMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class RegionEffects {
  onLoadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCities),
      withLatestFrom(this.store.pipe(map(state => state.region))),
      filter(([action, state]) => !state.cityIds.length),
      exhaustMap(() =>
          this.regionService.allCities().pipe(
            map(res => citiesLoaded({payload: res.datas}))
          )
      )
    )
  );

  onLoadDistrictsOfCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDistrictsOfCity),
      withLatestFrom(this.store.pipe(map(state => state.region.districtIdsMap))),
      filter(([action, state]) => !state[action.payload]?.length),
      switchMap(([action, state]) =>
        this.regionService.districts(action.payload).pipe(
          map(res => districtsLoaded({payload: res.datas}))
        )
      )
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly regionService: RegionService
  ) { }

}
