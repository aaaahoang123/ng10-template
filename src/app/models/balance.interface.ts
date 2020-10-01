/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/8/2019
 * Time: 2:12 PM
 */
import {IBalanceHistory} from './balance-history.interface';
import {ISchedules} from './schedules.interface';
import {User} from './user.interface';
import {IScheduleRevenue} from './order.interface';

export enum BalanceStatus {
  UN_CONFIRM = 1,
  CONFIRMED = 2,
  DELETED = -1,
  CHECKED = 3,
}

export interface IBalance {
  schedule_id: number;
  revenue_balance: number;
  revenue_pretty: string;
  payment_balance: number;
  payment_pretty: string;
  prepaid: number;
  prepaid_pretty: string;
  revenue_description: IBalanceRevenueDescription;
  payment_description: IPaymentDescription;
  vehicle_plate: string;
  sub_driver: string;
  confirmed_user: User;
  created_at: string;
  updated_at: string;
  status: BalanceStatus;
  status_title: string;
  histories: IBalanceHistory[];
  schedule: ISchedules;
}

export interface IBalanceRevenueDescription {
  package: IRevenue[];
  passenger: IRevenue[];
  total: string;
}

export interface IRevenue {
  price: number;
  quantity: number;
  unit_price: number;
}

export interface IPaymentDescription {
  package: IPayment[];
  total: string;
}

export interface IPayment {
  price: number;
  name: string;
}

export interface IBalanceList {
  balances: IBalance[];
  schedules_revenue: {[key: number]: IScheduleRevenue};
}
