import {IScheduleVoyage} from './schedule-voyage.interface';

export interface Voyage {
  id: number;
  from_id: number;
  from: string;
  to_id: number;
  to: string;
  create_at: string;
  update_at: string;
  status: number;
  status_title: string;
  parent: number;
  children?: Voyage[];
  ordinal_number: number;
  pivot?: IScheduleVoyage;
  from_province_id: number;
  to_province_id: number;

  isDeleting?: boolean;
}

export enum VoyageStatus {
  Active = 1,
  Inactive = -1
}
