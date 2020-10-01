/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/9/2019
 * Time: 5:32 PM
 */
import {IVehicleCategory} from './vehicle-category.interface';

export enum MaintenancePlanType {
  KILOMETER_PLAN = 1,
  DAY_PLAN = 2
}

export interface IMaintenancePlan {
    description: string;
    id: number;
    title: string;
    cycle: number;
    cycle_pretty: string;
    created_at: string;
    updated_at: string;
    status: number;
    status_title: string;
    vehicle_categories: IVehicleCategory[];
    type: MaintenancePlanType;
    isDeleting?: boolean;
}
