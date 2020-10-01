/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/8/2019
 * Time: 2:15 PM
 */
import {IBalance} from './balance.interface';
import {User} from './user.interface';

export enum BalanceHistoryType {
   CREATE = 1,
   UPDATE = 2
}

export interface IBalanceHistory {
  id: number;
  schedule_id: number;
  old_data: IBalance;
  new_data: IBalance;
  user_id: number;
  user: User;
  type: BalanceHistoryType;
  created_at: string;
  updated_at: string;
  status: number;
  status_title: string;
  reason: string;
}
