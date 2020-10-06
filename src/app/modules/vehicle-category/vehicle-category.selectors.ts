import {AppState} from '../../app.state';
import {createSelector} from '@ngrx/store';

export const selectVehicleCategoryState = (state: AppState) => state.vehicleCategory;
export const selectVehicleCategoryFormLoading = createSelector(
  selectVehicleCategoryState,
  state => state.formStatus === 'loading'
);

export const selectVehicleCategoryFormData = createSelector(
  selectVehicleCategoryState,
  state => state.formData
);

export const selectVehicleCategoryFormId = createSelector(
  selectVehicleCategoryState,
  state => state.formId
);

export const selectListVehicleCategories = createSelector(
  selectVehicleCategoryState,
  state => state.ids.map(id => state.entities[id])
);
