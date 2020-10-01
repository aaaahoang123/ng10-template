import {User} from './user.interface';
import {IOrder} from './order.interface';
import {CommonStatus} from '../enums/common-status.enum';

export enum TransactionType {
  ORDER = 1
}

export enum TransactionStatus {
  PROCESSING = 1,
  DONE = 2,
  REJECT = -1
}

export interface ITransaction {
  id: string;
  target_id: number;
  type: TransactionType;
  type_title: string;
  user_id: number;
  user: User;
  value: number;
  value_pretty: string;
  description: string;
  confirmed_user_id: number;
  confirmed_user?: User;
  order?: IOrder;
  created_at: string;
  updated_at: string;
  status: TransactionStatus;
  status_title: string;
  inspected: CommonStatus;
}
