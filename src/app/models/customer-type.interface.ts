export interface ICustomerType {
    id: number;
    name: string;
    description: string;
    min_travel_times: number;
    color: string;
    discount: number;
    created_at: string;
    updated_at: string;
    status: CustomerTypeStatus;
    status_title: string;

    isDeleting?: boolean;
}

export enum CustomerTypeStatus {
    Active = 1,
    Inactive = -1
}
