import {VehicleTicket} from './vehicle-ticket.interface';
import {Vehicle} from './vehicle.interface';
import {VehicleSeat} from './vehicle-seat.interface';
import {CommonStatus} from '../common/enum/common-status';

export interface VehicleCategory {
  created_at: string;
  id: number;
  name: string;
  seat_quantity: number;
  status: CommonStatus;
  status_title: string;
  updated_at: string;

  vehicles_count?: number;
  vehicles?: Vehicle[];

  tickets_count?: number;
  tickets?: VehicleTicket[];

  vehicle_seats: VehicleSeat[];

  isDeleting: boolean;
}
