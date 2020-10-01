/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/14/2019
 * Time: 1:45 PM
 */
import {IMaintenancePlan} from './maintenance-plan.interface';
import {User} from './user.interface';
import {IVehicle} from './vehicle.interface';

export enum MaintenanceTrackStatus {
  TRACKING = 1,
  MAINTAINED = 2,
  DELETED = -1,
}

export interface IMaintenanceTrack {
  created_at: string;
  id: number;
  maintenance_at: number;
  maintenance_at_pretty: string;
  plan: IMaintenancePlan;
  plan_id: number;
  status: MaintenanceTrackStatus;
  status_title: string;
  tracking_to: number;
  tracking_to_pretty: string;
  updated_at: string;
  user: User;
  user_id: number;
  vehicle: IVehicle;
  vehicle_id: number;

  isRequesting: boolean;
}
