import {User} from './user.interface';

export interface IActionLog {
    id: number;
    message: string;
    type: EActionLogTypes;
    type_str: string;
    target: number;
    color_type: EActionLogColorType;
    color: string;
    status: EActionLogStatus;
    status_title: string;
    created_at: string;
    updated_at: string;
    created_at_diff: string;
    user_id: number;
    user: User;
}

export enum EActionLogTypes {
    TYPE_ORDER_LOG = 1,
    TYPE_SCHEDULE_LOG = 2
}

export enum EActionLogStatus {
    STATUS_UNREAD = 1,
    STATUS_READ = 2
}

export enum EActionLogColorType {
    COLOR_TYPE_SUCCESS = 1,
    COLOR_TYPE_WARNING = 2,
    COLOR_TYPE_DANGER = -1
}
