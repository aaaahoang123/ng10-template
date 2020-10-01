/**
 * Created by PhpStorm.
 * Author: DO HOANG ( shinkenger.vn9x@gmail.com )
 * Date: 10/2/2019
 * Time: 11:19 PM
 */
import {IPaginationMeta} from './pagination-meta.interface';

export interface Rest<T> {
  status: number;
  message: string;
  data: T;
  datas: T[];
  meta: IPaginationMeta;
}
