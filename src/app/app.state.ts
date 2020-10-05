import {AuthState} from './modules/auth/auth.reducer';
import {RegionState} from './modules/region/region.state';
import {VoyageState} from './modules/voyage/voyage.state';
import {VehicleCategoryState} from './modules/vehicle-category/vehicle-category.state';

export interface AppState {
  auth: AuthState;
  region: RegionState;
  voyage: VoyageState;
  vehicleCategory: VehicleCategoryState;
}
