import {ICustomer} from './customer.interface';
import {ISchedules} from './schedules.interface';
import {User} from './user.interface';
import {IOrderDetail} from './order-detail.interface';
import {IPickupLocation} from './pickup-location.interface';
import {IGetoffLocation} from './getoff-location.interface';
import {OrderOrigin} from '../modules/orders/orders-list.params';
import {VehicleSeat} from './vehicle-seat.interface';

export interface IOrder {
  addition_price: number;
  note: string;
  id: number;
  customer_id: number;
  customer: ICustomer;
  schedule_id: number;
  schedule: ISchedules;
  total_price: number;
  total_price_pretty: string;
  paid: number;
  paid_pretty: string;
  created_by: number;
  creator: User;
  order_details: IOrderDetail[];
  pick_up_locations: IPickupLocation[];
  get_off_locations: IGetoffLocation[];
  created_at: string;
  updated_at: string;
  created_at_mls: number;
  updated_at_mls: number;
  status: number;
  status_title: string;
  distance_library_id: number;
  order_details_count: number;
  origin: OrderOrigin;
  origin_title: string;
  seats: VehicleSeat[];

  isEditing: boolean;
  isDeleting: boolean;
}

export enum OrderStatus {
  Processing = 1,
  Done = 2,
  Reject = -1
}

export interface IScheduleRevenue {
  schedule_id: number;
  total_paid: number;
  total_price: number;
}
