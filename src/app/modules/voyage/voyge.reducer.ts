import {VoyageFormData, VoyagePoint, VoyageState} from './voyage.state';
import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {filterParams, isDuplicateParams, Payload, PayloadAction, useImmer} from '../../core';
import {Voyage} from '../../models/voyages';
import {VoyageParams} from './voyage.params';
import {Rest} from '../../models/rest.interface';
import keyBy from 'lodash/keyBy';
import union from 'lodash/union';

export const voyageFormIdChanged = createAction('[Voyage] FormIdChanged', props<Payload<number|string>>());
export const submitVoyageForm = createAction('[Voyage] SubmitForm', props<Payload<VoyageFormData>>());
export const voyageFormSubmitted = createAction('[Voyage] FormSubmitted', props<Payload<boolean>>());

// payload.extra == true when this action want to change formData by the loaded voyage
export const singleVoyageAdded = createAction('[Voyage] SingleAdded', props<Payload<Voyage, boolean>>());
export const voyageFormChanged = createAction('[Voyage] FormChanged', props<Payload<VoyageFormData, number>>());

// payload.extra === true when you want to sync the params to the router
export const voyageParamsChange = createAction('[Voyage] ParamsChange', props<Payload<Partial<VoyageParams>|null|undefined, boolean>>());
export const listVoyagesLoaded = createAction('[Voyage] ListLoaded', props<Payload<Rest<Voyage>>>());

export const deleteVoyage = createAction('[Voyage] Delete', props<Payload<number>>());
export const voyageDeleted = createAction('[Voyage] Deleted', props<Payload<number>>());
export const voyageDeleteFailed = createAction('[Voyage] DeleteFailed', props<Payload<number>>());

const takeRegionId = (voyage: Voyage, prefix: 'from' | 'to' = 'to'): number | string => {
  const v = voyage as any;
  return v[`${prefix}_id`]
    ? `${v[prefix + '_province_id']}-${v[prefix + '_id']}`
    : v[`${prefix}_province_id`];
};

const onSingleVoyageAdded = (state: VoyageState, {payload, extra: willUpdateForm }: PayloadAction<Voyage, boolean>): void => {
  state.entities[payload.id] = payload;
  if (!state.ids.includes(payload.id)) {
    state.ids.push(payload.id);
  }
  state.childrenMapper[payload.id] = payload.children.map(child => {
    state.entities[child.id] = child;
    return child.id;
  });

  if (willUpdateForm) {
    const voyages: VoyagePoint[] = [];
    payload?.children?.forEach((child, index) => {
      if (!index) {
        voyages.push({
          district_id: child.from_id,
          province_id: child.from_province_id,
          region_id: takeRegionId(child, 'from')
        });
      }
      voyages.push({
        district_id: child.to_id,
        province_id: child.to_province_id,
        region_id: takeRegionId(child, 'to')
      });
    });
    state.formData = { voyages };
    state.formId = payload.id;
  }
};

const onVoyageParamsChange = (state: VoyageState, {payload}: PayloadAction<Partial<VoyageParams>>): void => {
  const oldParams = state.params;
  state.params = {
    ...state.params,
    ...(payload ?? {})
  };
  if (!state.listLoaded || !isDuplicateParams(oldParams, state.params)) {
    state.status = 'loading';
  }
};

const onListVoyagesLoaded = (state: VoyageState, {payload}: PayloadAction<Rest<Voyage>>): void => {
  state.ids = payload.datas.map(voyage => {
    const {children, ...withoutChildren} = voyage;
    state.entities[voyage.id] = withoutChildren;
    state.childrenMapper[voyage.id] = children.map((child) => {
      state.entities[child.id] = child;
      return child.id;
    });
    return withoutChildren.id;
  });
  state.listLoaded = true;
  state.status = 'idle';
  state.listMeta = payload.meta;
};

const onDeleteVoyage = (state: VoyageState, {payload}: PayloadAction<number>): void => {
  state.entities[payload].isDeleting = true;
};

const onVoyageDeleted = (state: VoyageState, {payload}: PayloadAction<number>): void => {
  delete state.entities[payload];
  state.ids = state.ids.filter(id => id !== payload);
  state.childrenMapper[payload]?.forEach(child => delete state.entities[child]);
  delete state.childrenMapper[payload];
};

const onVoyageDeleteFailed = (state: VoyageState, {payload}: PayloadAction<number>): void => {
  state.entities[payload].isDeleting = false;
};

const reducer = createReducer(
  {...new VoyageState()},
  on(submitVoyageForm, state => ({...state, formRequesting: true})),
  on(voyageFormSubmitted, state => ({...state, formRequesting: false})),
  on(voyageFormChanged, (state, {payload, extra}) =>
    ({...state, formData: payload, formId: typeof extra === 'undefined' ? state.formId : extra})),
  on(singleVoyageAdded, useImmer(onSingleVoyageAdded)),
  on(listVoyagesLoaded, useImmer(onListVoyagesLoaded)),
  on(voyageParamsChange, useImmer(onVoyageParamsChange)),
  on(deleteVoyage, useImmer(onDeleteVoyage)),
  on(voyageDeleted, useImmer(onVoyageDeleted)),
  on(voyageDeleteFailed, useImmer(onVoyageDeleteFailed))
);

export const voyageReducer = (state: VoyageState, action: Action) => reducer(state, action);
