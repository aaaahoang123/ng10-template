import {Dictionary, EntityState} from '@ngrx/entity';
import {Voyage} from '../../models/voyages';
import {UseValidators} from '../../core';
import {Validators} from '@angular/forms';
import {PaginationMeta} from '../../models/pagination-meta.interface';
import {VoyageParams} from './voyage.params';
import {StateStatus} from '../../common/enum/state-status';

export class VoyagePoint {
  @UseValidators(Validators.required)
  // tslint:disable-next-line:variable-name
  district_id?: number = null;

  @UseValidators(Validators.required)
  // tslint:disable-next-line:variable-name
  province_id?: number = null;

  @UseValidators(Validators.required)
  // tslint:disable-next-line:variable-name
  region_id?: number | string = null;
}

export class VoyageFormData {
  voyages = [
    new VoyagePoint(),
    new VoyagePoint()
  ];
}

export class VoyageState {
  ids: number[] = [];
  formId?: number = undefined;
  formRequesting = false;
  formData: VoyageFormData = {...new VoyageFormData()};

  entities: Dictionary<Voyage> = {};
  childrenMapper: Dictionary<number[]> = {};
  listMeta: PaginationMeta = {} as PaginationMeta;
  listLoaded = false;
  params: VoyageParams = new VoyageParams();
  status: StateStatus = 'idle';
}
