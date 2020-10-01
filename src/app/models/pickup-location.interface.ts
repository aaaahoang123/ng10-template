import {ICustomer} from './customer.interface';
import {ISchedules} from './schedules.interface';
import {IDistanceLibrary} from './distance-library.interface';
import {IGetoffLocation} from './getoff-location.interface';

export enum PickUpSeen {
  seen = 1,
  unseen = -1,
}

export interface IPickupLocation {
  id: number;
  schedule_id: number;
  schedule: ISchedules;
  order_id: number;
  customer_id: number;
  customer: ICustomer;
  people_quantity: number;
  address: string;
  longitude: string;
  latitude: string;
  created_at: string;
  updated_at: string;
  updated_at_mls: number;
  created_at_mls: number;
  status: number;
  status_title: string;
  reject_reason: string;
  distance_library_id: number;
  distance_library: IDistanceLibrary;
  get_off_location?: IGetoffLocation;
  seen: PickUpSeen;
  note: string;

  isEditing?: boolean;
  isDeleting?: boolean;
}

export enum PickupLocationStatus {
  Processing = 1,
  Done = 2,
  Reject = -1,
  Pre_Reject = -2,
}
