import {createAction, createReducer, on, props} from '@ngrx/store';
import {VehicleCategoryForm, VehicleCategoryState} from './vehicle-category.state';
import {filterParams, isDuplicateParams, Payload, PayloadAction, useImmer} from '../../core';
import {VehicleCategory} from '../../models/vehicle-category.interface';
import {Rest} from '../../models/rest.interface';
import {VehicleCategoryParams} from './vehicle-category.params';
import keyBy from 'lodash/keyBy';
import {plainToClass} from 'class-transformer';

export const vehicleCategoryFormIdChange = createAction('[VehicleCategory] FormIdChange', props<Payload<number|string>>());
export const submitVehicleCategoryForm = createAction('[VehicleCategory] SubmitForm', props<Payload<VehicleCategoryForm>>());
export const vehicleCategoryFormSubmitted = createAction('[VehicleCategory] FormSubmitted', props<Payload<boolean>>());

// payload.extra == true when this action want to change formData by the loaded vehicleCategory
export const singleVehicleCategoryLoaded = createAction('[VehicleCategory] SingleLoaded', props<Payload<VehicleCategory, boolean>>());
export const vehicleCategoryFormChanged = createAction('[VehicleCategory] FormChanged', props<Payload<VehicleCategoryForm, number>>());

// payload.extra === true when you want to sync the params to the router
export const vehicleCategoryParamsChange = createAction(
  '[vehicleCategory] ParamsChange',
  props<Payload<Partial<VehicleCategoryParams>|null|undefined, boolean>>()
);
export const listVehicleCategoriesLoaded = createAction('[VehicleCategory] ListLoaded', props<Payload<Rest<VehicleCategory>>>());

export const deleteVehicleCategory = createAction('[VehicleCategory] Delete', props<Payload<number>>());
export const vehicleCategoryDeleted = createAction('[VehicleCategory] Deleted', props<Payload<number>>());
export const vehicleCategoryDeleteFailed = createAction('[VehicleCategory] DeleteFailed', props<Payload<number>>());

const onSingleVehicleCategoryAdded = (
  state: VehicleCategoryState,
  {payload, extra: willUpdateForm}: PayloadAction<VehicleCategory, boolean>
): void => {
  state.entities[payload.id] = {
    ...state.entities[payload.id] || {},
    ...filterParams(payload)
  };
  if (!state.ids.includes(payload.id)) {
    state.ids.push(payload.id);
  }

  if (willUpdateForm) {
    state.formId = payload.id;
    const newFormData = plainToClass(VehicleCategoryForm, payload, {excludeExtraneousValues: true});

    const cols = new Set();
    const rows = new Set();
    payload.vehicle_seats.forEach(seat => {
      cols.add(seat.p_col);
      rows.add(seat.p_row);
    });
    newFormData.cols = cols.size;
    newFormData.rows = rows.size;
    state.formData = newFormData;
  }
};

const onVehicleCategoryParamsChange = (
  state: VehicleCategoryState,
  {payload}: PayloadAction<Partial<VehicleCategoryParams>|null|undefined, boolean>
): void => {
  const oldParams = state.params;
  state.params = {
    ...state.params,
    ...(payload ?? {})
  };
  if (!state.listLoaded || !isDuplicateParams(oldParams, state.params)) {
    state.listStatus = 'loading';
  }
};

const onListVehicleCategoriesLoaded = (state: VehicleCategoryState, {payload}: PayloadAction<Rest<VehicleCategory>>): void => {
  state.ids = payload.datas.map(category => category.id);
  state.entities = keyBy(payload.datas, 'id');
  state.listLoaded = true;
  state.listStatus = 'idle';
};

const onVehicleCategoryFormChanged = (state: VehicleCategoryState, {payload, extra}: PayloadAction<VehicleCategoryForm, number>): void => {
  state.formData = payload;
  state.formId = typeof extra === 'undefined' ? state.formId : extra;
};

const onDeleteVehicleCategory = (state: VehicleCategoryState, {payload}: PayloadAction<number>): void => {
  state.entities[payload].isDeleting = true;
};

const onVehicleCategoryDeleted = (state: VehicleCategoryState, {payload}: PayloadAction<number>): void => {
  delete state.entities[payload];
  state.ids = state.ids.filter(id => id !== payload);
};

const onVehicleCategoryDeleteFailed = (state: VehicleCategoryState, {payload}: PayloadAction<number>): void => {
  state.entities[payload].isDeleting = false;
};

export const vehicleCategoryReducer = createReducer(
  {...new VehicleCategoryState()},
  on(submitVehicleCategoryForm, state => ({...state, formStatus: 'loading'})),
  on(vehicleCategoryFormSubmitted, state => ({...state, formStatus: 'idle'})),
  on(vehicleCategoryFormChanged, useImmer(onVehicleCategoryFormChanged)),
  on(vehicleCategoryParamsChange, useImmer(onVehicleCategoryParamsChange)),
  on(listVehicleCategoriesLoaded, useImmer(onListVehicleCategoriesLoaded)),
  on(deleteVehicleCategory, useImmer(onDeleteVehicleCategory)),
  on(vehicleCategoryDeleted, useImmer(onVehicleCategoryDeleted)),
  on(vehicleCategoryDeleteFailed, useImmer(onVehicleCategoryDeleteFailed)),
  on(singleVehicleCategoryLoaded, useImmer(onSingleVehicleCategoryAdded))
);

