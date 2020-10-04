import { IVehicle } from './vehicle.interface';
import { Voyage } from './voyages';
import { User } from './user.interface';
import {IVehicleTicket} from './vehicle-ticket.interface';
import {IPickupLocation} from './pickup-location.interface';
import {IGetoffLocation} from './getoff-location.interface';
import {IOrder} from './order.interface';
import {IVehicleCategory} from './vehicle-category.interface';
import {IVehicleSeat} from './vehicle-seat.interface';

export enum ScheduleType {
  FOR_ADMIN = 1,
  FOR_CUSTOMER = 2
}

export interface ISchedules {
  color_type: 'success' | 'error' | 'info';
  id: number;
  vehicle_id: number;
  vehicle: IVehicle;
  voyage_id: number;
  voyage: Voyage;
  voyages: Voyage[];
  driver_id: number;
  driver: User;
  created_by: number;
  creator: User;
  start_time: number;
  start_time_str: string;
  end_time: number;
  end_time_str: string;
  status: number;
  status_title: string;
  vehicle_category_id: number;
  vehicle_category: IVehicleCategory;
  type: ScheduleType;
  type_title: string;

  pick_up_locations?: IPickupLocation[];
  get_off_locations?: IGetoffLocation[];
  tickets?: IVehicleTicket[];
  orders?: IOrder[];
  seat_arr?: IVehicleSeat[];

  selected_ticket: number;

  has_balance: boolean;
}

export enum ScheduleStatus {
  Processing = 1,
  Done = 2,
  Reject = -1
}
