import {IScheduleTemplate} from './schedule-template.interface';

export interface IOrderCreateData {
    [key: string]: IScheduleTemplate[];
}
