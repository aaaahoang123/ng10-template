import {IVehicleTicket} from './vehicle-ticket.interface';

export interface IOrderDetail {
  id: number;
  order_id: number;
  ticket_id: number;
  ticket: IVehicleTicket;
  voyage_ids: number[];
  unit_price: number;
  unit_price_pretty: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  status: number;
}
