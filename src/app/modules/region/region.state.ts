import {Dictionary} from '@ngrx/entity';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import {City} from '../../models/regions/city.interface';
import {District} from '../../models/regions/district.interface';

export class RegionState {
  cityIds: number[] = [];
  districtIdsMap: Dictionary<number[]> = {};
  cities: Dictionary<City> = {};
  districts: Dictionary<District> = {};
  treeNodes: NzTreeNodeOptions[] = [];
}
