import {IVoyages} from './voyages';
import {IVehicleCategory} from './vehicle-category.interface';
import {ISchedules} from './schedules.interface';

export interface IScheduleTemplate {
    id: number;
    voyage_id: number;
    voyage?: IVoyages;
    vehicle_category_id: number;
    vehicle_category: IVehicleCategory;
    start_time_offset: number;
    start_time_offset_str: string;
    end_time_offset: number;
    end_time_offset_str: string;
    type: ScheduleTemplateType;
    created_at: string;
    updated_at: string;
    status: ScheduleTemplateStatus;
    can_auto_create_schedule: boolean;
    schedules?: ISchedules[];

    selectedSchedule?: ISchedules;
    isDeleting: boolean;
    isCreatingNewSchedule: boolean;

    totalCustomers: number;
    totalShipItems: number;
}

export enum ScheduleTemplateType {
    morning_type = 1,
    evening_type = 2,
    night_type = 3
}

export enum ScheduleTemplateStatus {
    Active = 1,
    Inactive = -1
}
