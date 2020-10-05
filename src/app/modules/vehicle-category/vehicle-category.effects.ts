import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Actions} from '@ngrx/effects';
import {VehicleCategoryService} from './vehicle-category.service';

@Injectable()
export class VehicleCategoryEffects {
  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly categoryService: VehicleCategoryService
  ) { }
}
