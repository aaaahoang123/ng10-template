import {ICity} from './city.interface';
import {IDistrict} from './district.interface';

export interface IStreet {
    id: number;
    _name: string;
    _prefix: string;
    _province_id: number;
    _district_id: number;
    tag: string;
    city?: ICity;
    district?: IDistrict;
}
