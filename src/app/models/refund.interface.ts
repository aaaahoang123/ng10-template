import {User} from './user.interface';
import {IOrder} from './order.interface';

export enum RefundStatus {
   PROCESSING = 2,
   INACTIVE = -1,
   ACCEPTED = 1,
}

export interface IRefund {
  confirm_user_id: number;
  created_at: string;
  id: number;
  order_id: number;
  status: RefundStatus;
  status_title: string;
  updated_at: string;
  user_id: number;
  user?: User;
  confirmed_user?: User;
  order?: IOrder;

  isProcessing: boolean;
}
