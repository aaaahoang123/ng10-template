/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/10/2019
 * Time: 5:06 PM
 */
import {IDistrict} from '../regions/district.interface';

export interface ITopCustomerOfLocation {
  _district_id: number;
  total_people: string;
  district: IDistrict;
}
