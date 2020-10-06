import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {VehicleCategoryService} from './vehicle-category.service';
import {
  listVehicleCategoriesLoaded,
  singleVehicleCategoryLoaded,
  submitVehicleCategoryForm,
  vehicleCategoryFormChanged,
  vehicleCategoryFormIdChange,
  vehicleCategoryFormSubmitted,
  vehicleCategoryParamsChange
} from './vehicle-category.reducer';
import {catchError, exhaustMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {selectVehicleCategoryFormId} from './vehicle-category.selectors';
import {of} from 'rxjs';
import toNumber from 'lodash/toNumber';
import {VehicleCategoryForm} from './vehicle-category.state';
import {NzMessageService} from 'ng-zorro-antd/message';
import {pushParamsToRouter} from '../../app.actions';

@Injectable()
export class VehicleCategoryEffects {
  onSubmitVehicleCategoryForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitVehicleCategoryForm),
      withLatestFrom(this.store.select(selectVehicleCategoryFormId)),
      exhaustMap(([action, formId]) =>
        formId
            ? this.categoryService.edit(formId, action.payload)
            : this.categoryService.create(action.payload)
      ),
      withLatestFrom(this.store.select(selectVehicleCategoryFormId)),
      switchMap(([res, formId]) => {
        this.message.success(`${formId ? 'Sửa' : 'Tạo'} tuyến đường thành công`);
        return [
          vehicleCategoryFormSubmitted({payload: true}),
          singleVehicleCategoryLoaded({payload: res.data})
        ];
      }),
      catchError(() => of(vehicleCategoryFormSubmitted({payload: false})))
    )
  );

  onVehicleCategoryFormIdChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vehicleCategoryFormIdChange),
      withLatestFrom(this.store.select(selectVehicleCategoryFormId)),
      filter(([action, formId]) => (toNumber(action.payload) || null) !== (toNumber(formId) || null)),
      exhaustMap(([action]) => {
        if (action.payload) {
          return this.categoryService
            .single(action.payload as any)
            .pipe(map(res => singleVehicleCategoryLoaded({payload: res.data, extra: true})));
        } else {
          return of(vehicleCategoryFormChanged({payload: new VehicleCategoryForm(), extra: action.payload as any}));
        }
      })
    )
  );

  onVehicleCategoryParamsChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vehicleCategoryParamsChange),
      withLatestFrom(
        this.store.pipe(
          select(state => {
            const {params, listStatus} = state.vehicleCategory;
            return {params, status: listStatus};
          })
        )
      ),
      filter(([action, {params, status}]) => status === 'loading'),
      switchMap(([action, {params}]) =>
        this.categoryService.list(params as any)
          .pipe(
            switchMap(res => {
              const output: Action[] = [listVehicleCategoriesLoaded({payload: res} as any)];
              if (action.extra) {
                output.push(pushParamsToRouter({payload: params}));
              }
              return output;
            })
          )
      )
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions,
    private readonly categoryService: VehicleCategoryService,
    private readonly message: NzMessageService
  ) { }
}
