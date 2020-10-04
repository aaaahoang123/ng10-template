import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {Payload, PayloadAction, useImmer} from '../../core';
import {City} from '../../models/regions/city.interface';
import {District} from '../../models/regions/district.interface';
import {RegionState} from './region.state';
import {Dictionary} from '@ngrx/entity';
import {NzTreeNodeOptions} from 'ng-zorro-antd/tree';

export const loadCities = createAction('[Region] LoadCities');
export const citiesLoaded = createAction('[Region] CitiesLoaded', props<Payload<City[]>>());
export const loadDistrictsOfCity = createAction('[Region] LoadDistrictsOfCity', props<Payload<number>>());
export const districtsLoaded = createAction('[Region] DistrictsLoaded', props<Payload<District[]>>());

const onCitiesLoaded = (state: RegionState, action: PayloadAction<City[]>): void => {
  const cities = {} as Dictionary<City>;
  const treeNodes: NzTreeNodeOptions[] = [];
  state.cityIds = action.payload.map(city => {
    cities[city.id] = city;
    treeNodes.push({
      title: city._name,
      key: city.id as any,
      value: city.id as any
    });
    return city.id;
  });
  state.treeNodes = treeNodes;
  state.cities = cities;
};

const onDistrictsLoaded = (state: RegionState, action: PayloadAction<District[]>): void => {
  const hasChangedDistrictCities = new Set<number>();
  action.payload.forEach(district => {
    hasChangedDistrictCities.add(district._province_id);
    const map = state.districtIdsMap[district._province_id] = state.districtIdsMap[district._province_id] || [];
    if (!map.includes(district.id)) {
      map.push(district.id);
    }
    state.districts[district.id] = district;
  });

  state.treeNodes.forEach(node => {
    if (hasChangedDistrictCities.has(node.key as any)) {
      node.children = (state.districtIdsMap[node.key] ?? []).map(districtId => {
        const district = state.districts[districtId];
        return {
          key: `${node.key}-${district.id}`,
          value: `${node.key}-${district.id}`,
          title: district._name,
          isLeaf: true
        };
      });
    }
  });
};

const reducer = createReducer(
  {...new RegionState()},
  on(citiesLoaded, useImmer(onCitiesLoaded)),
  on(districtsLoaded, useImmer(onDistrictsLoaded))
);

export const regionReducer = (state: RegionState, action: Action) => reducer(state, action);
