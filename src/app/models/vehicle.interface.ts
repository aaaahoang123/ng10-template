import {VehicleCategory} from './vehicle-category.interface';
import {IMaintenanceTrack} from './maintenance-track.interface';

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  color: string;
  last_maintenance: string;
  vehicle_category_id;
  vehicle_category: VehicleCategory;
  created_at: string;
  updated_at: string;
  status: number;
  status_title: string;
  meter: number;
  meter_pretty: string;
  maintenance_tracks: IMaintenanceTrack[];
  maintenance_track_maps: {
    [key: number]: IMaintenanceTrack
  };

  // user_id?: number;
  // user?: UserInterface;

  isDeleting: boolean;
}

export enum VehicleStatus {
  Active = 1,
  Inactive = -1
}
