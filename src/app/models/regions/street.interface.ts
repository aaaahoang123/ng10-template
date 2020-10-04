import {City} from './city.interface';
import {District} from './district.interface';

export interface Street {
    id: number;
    _name: string;
    _prefix: string;
    _province_id: number;
    _district_id: number;
    tag: string;
    city?: City;
    district?: District;
}
