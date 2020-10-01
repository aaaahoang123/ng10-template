import {ICustomerType} from './customer-type.interface';

export interface ICustomer {
  id: number;
  name: string;
  customer_type_id: number;
  customer_type: ICustomerType;
  address: string;
  get_off_address: string;
  latitude: string;
  longitude: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  status: CustomerStatus;
  status_title: string;

  isDeleting?: boolean;
}

export enum CustomerStatus {
  Active = 1,
  Inactive = -1
}
