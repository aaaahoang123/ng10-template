import {CommonStatus} from '../../common/enum/common-status';
import {UseValidators} from '../../core';
import {Validators} from '@angular/forms';
import {StateStatus} from '../../common/enum/state-status';
import {Dictionary} from '@ngrx/entity';
import {VehicleCategory} from '../../models/vehicle-category.interface';
import {VehicleCategoryParams} from './vehicle-category.params';

export class VehicleSeatForm {
  id: number = null;

  @UseValidators([Validators.required, Validators.min(0)])
  // tslint:disable-next-line:variable-name
  p_col: number;

  @UseValidators([Validators.required, Validators.min(0)])
  // tslint:disable-next-line:variable-name
  p_row: number;

  selectable = true;
  // tslint:disable-next-line:variable-name
  addition_price: number = null;

  constructor(col: number = 0, row: number = 0) {
    this.p_col = col;
    this.p_row = row;
  }
}

export class VehicleCategoryForm {
  @UseValidators([Validators.required])
  name: string = null;

  @UseValidators([Validators.required, Validators.min(1)])
  // tslint:disable-next-line:variable-name
  seat_quantity = 12;

  status: CommonStatus = null;

  // tslint:disable-next-line:variable-name
  vehicle_seats: VehicleSeatForm[] = [
    {...new VehicleSeatForm()}
  ];
}

export class VehicleCategoryState {
  formData = {...new VehicleCategoryForm()};
  formId: number = undefined;
  formStatus: StateStatus = 'idle';

  ids: number[] = [];
  entities: Dictionary<VehicleCategory> = {};
  params: VehicleCategoryParams = {...new VehicleCategoryParams()};
  listLoaded = false;
  listStatus: StateStatus = 'idle';
}
