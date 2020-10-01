import {CommonStatus} from '../enums/common-status.enum';

export interface ICallingPhone {
  id: number;
  phone_number: string;
  my_phone_number: string;
  status: CommonStatus;
  created_at: string;
  updated_at: string;
}
