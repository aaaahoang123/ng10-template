export interface IGetoffLocation {
  id: number;
  schedule_id: number;
  order_id: number;
  address: string;
  longitude: string;
  latitude: string;
  created_at: string;
  updated_at: string;
  status: number;
  status_title: string;

  isDeleting: boolean;
  isEditing: boolean;
}

export enum GetoffLocationStatus {
  Processing = 1,
  Done = 2,
  Reject = -1
}
