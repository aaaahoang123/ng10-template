import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {Observable} from 'rxjs';
import {VehicleCategory} from '../../../models/vehicle-category.interface';
import {selectListVehicleCategories} from '../vehicle-category.selectors';
import {CommonStatus} from '../../../common/enum/common-status';
import {RouterEnum} from '../../../core';
import {deleteVehicleCategory, vehicleCategoryParamsChange} from '../vehicle-category.reducer';

@Component({
  selector: 'app-vehicle-category-table',
  templateUrl: './vehicle-category-table.component.html',
  styleUrls: ['./vehicle-category-table.component.less']
})
export class VehicleCategoryTableComponent implements OnInit {
  datas$: Observable<VehicleCategory[]>;
  CommonStatus = CommonStatus;
  RouterEnum = RouterEnum;
  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(vehicleCategoryParamsChange({payload: null}));
    this.datas$ = this.store.select(selectListVehicleCategories);
  }

  deleteCategory(id: number): void {
    this.store.dispatch(deleteVehicleCategory({payload: id}));
  }
}
