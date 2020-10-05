import {createAction, createReducer, on, props} from '@ngrx/store';
import {VehicleCategoryForm, VehicleCategoryState} from './vehicle-category.state';
import {isDuplicateParams, Payload, PayloadAction, useImmer} from '../../core';
import {VehicleCategory} from '../../models/vehicle-category.interface';
import {Rest} from '../../models/rest.interface';
import {VehicleCategoryParams} from './vehicle-category.params';
import keyBy from 'lodash/keyBy';

export const submitVehicleCategoryForm = createAction('[VehicleCategory] SubmitForm', props<Payload<VehicleCategoryForm>>());
export const vehicleCategoryFormSubmitted = createAction('[VehicleCategory] FormSubmitted', props<Payload<boolean>>());

// payload.extra == true when this action want to change formData by the loaded vehicleCategory
export const singleVehicleCategoryLoaded = createAction('[VehicleCategory] SingleLoaded', props<Payload<VehicleCategory, boolean>>());
export const vehicleCategoryFormChanged = createAction('[vehicleCategory] FormChanged', props<Payload<VehicleCategoryForm, number>>());

// payload.extra === true when you want to sync the params to the router
export const vehicleCategoryParamsChange = createAction(
  '[vehicleCategory] ParamsChange',
  props<Payload<Partial<VehicleCategoryParams>|null|undefined, boolean>>()
);
export const listVehicleCategoriesLoaded = createAction('[vehicleCategory] ListLoaded', props<Payload<Rest<VehicleCategory>>>());

export const deleteVehicleCategory = createAction('[vehicleCategory] Delete', props<Payload<number>>());
export const vehicleCategoryDeleted = createAction('[vehicleCategory] Deleted', props<Payload<number>>());
export const vehicleCategoryDeleteFailed = createAction('[vehicleCategory] DeleteFailed', props<Payload<number>>());

const onSingleVehicleCategoryAdded = (
  state: VehicleCategoryState,
  {payload, extra: willUpdateForm}: PayloadAction<VehicleCategory, boolean>
): void => {
  state.entities[payload.id] = payload;
  if (!state.ids.includes(payload.id)) {
    state.ids.push(payload.id);
  }

  if (willUpdateForm) {
    state.formId = payload.id;
    // Todo: Update the form data with the loaded VehicleCategory
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
  on(vehicleCategoryParamsChange, useImmer(onVehicleCategoryParamsChange)),
  on(listVehicleCategoriesLoaded, useImmer(onListVehicleCategoriesLoaded)),
  on(deleteVehicleCategory, useImmer(onDeleteVehicleCategory)),
  on(vehicleCategoryDeleted, useImmer(onVehicleCategoryDeleted)),
  on(vehicleCategoryDeleteFailed, useImmer(onVehicleCategoryDeleteFailed)),
  on(singleVehicleCategoryLoaded, useImmer(onSingleVehicleCategoryAdded))
);

