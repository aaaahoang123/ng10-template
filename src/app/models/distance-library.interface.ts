import {IStreet} from './regions/street.interface';

export interface IDistanceLibrary {
    id: number;
    street_id: number;
    street: IStreet;
    distance_time: number;
    created_at: string;
    updated_at: string;
    status: number;

    is_deleting: boolean;
}
