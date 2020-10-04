import {Injectable} from '@angular/core';
import {VoyageService} from './voyage.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {
  deleteVoyage,
  listVoyagesLoaded,
  singleVoyageAdded,
  submitVoyageForm,
  voyageDeleted,
  voyageDeleteFailed,
  voyageFormChanged,
  voyageFormIdChanged,
  voyageFormSubmitted,
  voyageParamsChange
} from './voyge.reducer';
import {catchError, exhaustMap, filter, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AppState} from '../../app.state';
import {of} from 'rxjs';
import {VoyageFormData} from './voyage.state';
import toNumber from 'lodash/toNumber';
import {pushParamsToRouter} from '../../app.actions';

@Injectable()
export class VoyageEffects {
  formId$ = this.store.pipe(select(state => state.voyage.formId));

  onSubmitVoyageForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitVoyageForm),
      withLatestFrom(this.formId$),
      exhaustMap(([action, formId]) =>
        formId
          ? this.voyageService.edit(formId, action.payload)
          : this.voyageService.createVoyage(action.payload)
      ),
      withLatestFrom(this.formId$),
      switchMap(([res, formId]) => {
        this.message.success(`${formId ? 'Sửa' : 'Tạo'} tuyến đường thành công`);
        return [
          voyageFormSubmitted({payload: true}),
          singleVoyageAdded({payload: res.data})
        ];
      })
    )
  );

  onVoyageFormIdChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voyageFormIdChanged),
      withLatestFrom(this.store.pipe(select(state => state.voyage.formId))),
      filter(([action, formId]) => (toNumber(action.payload) || null) !== (toNumber(formId) || null)),
      exhaustMap(([action]) => {
        if (action.payload) {
          return this.voyageService
            .single(action.payload as any)
            .pipe(map(res => singleVoyageAdded({payload: res.data, extra: true})));
        } else {
          return of(voyageFormChanged({payload: new VoyageFormData(), extra: action.payload as any}));
        }
      })
    )
  );

  onVoyageParamsChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voyageParamsChange),
      withLatestFrom(
        this.store.pipe(
          select(state => {
            const {params, status} = state.voyage;
            return {params, status};
          })
        )
      ),
      filter(([action, {params, status}]) => status === 'loading'),
      switchMap(([action, {params}]) =>
        this.voyageService.list(params as any)
          .pipe(
            switchMap(res => {
              const output: Action[] = [listVoyagesLoaded({payload: res} as any)];
              if (action.extra) {
                output.push(pushParamsToRouter({payload: params}));
              }
              return output;
            })
          )
      )
    )
  );

  onDeleteVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteVoyage),
      mergeMap(({payload}) =>
        this.voyageService.delete(payload).pipe(
          map(res => {
            this.message.success(`Xóa tuyến đường thành công`);
            return voyageDeleted({payload});
          }),
          catchError(error => of(voyageDeleteFailed({payload, error})))
        )
      )
    )
  );

  constructor(
    private readonly voyageService: VoyageService,
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly message: NzMessageService
  ) {
  }
}
