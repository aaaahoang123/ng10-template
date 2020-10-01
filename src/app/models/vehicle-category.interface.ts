import {IVehicleTicket} from './vehicle-ticket.interface';
import {IVehicle} from './vehicle.interface';
import {IVehicleSeat} from './vehicle-seat.interface';

export enum VehicleCategoryStatus {
  Active = 1,
  Inactive = -1
}

export interface IVehicleCategory {
  created_at: string;
  id: number;
  name: string;
  seat_quantity: number;
  status: VehicleCategoryStatus;
  status_title: string;
  updated_at: string;

  vehicles_count?: number;
  vehicles?: IVehicle[];

  tickets_count?: number;
  tickets?: IVehicleTicket[];

  vehicle_seats: IVehicleSeat[];

  isDeleting: boolean;
}
