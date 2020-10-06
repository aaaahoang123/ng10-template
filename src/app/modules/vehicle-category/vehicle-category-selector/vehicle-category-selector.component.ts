import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {VehicleCategory} from '../../../models/vehicle-category.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {vehicleCategoryParamsChange} from '../vehicle-category.reducer';
import {selectListVehicleCategories} from '../vehicle-category.selectors';
import {SimpleControlValueAccessor} from '../../../core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NzSelectModeType} from 'ng-zorro-antd/select/select.types';
import {InputBoolean} from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-vehicle-category-selector',
  templateUrl: './vehicle-category-selector.component.html',
  styleUrls: ['./vehicle-category-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => VehicleCategorySelectorComponent)
    }
  ]
})
export class VehicleCategorySelectorComponent extends SimpleControlValueAccessor implements OnInit {
  @Input() nzMode: NzSelectModeType = 'default';
  @Input() @InputBoolean() nzAllowClear: boolean;

  datas$: Observable<VehicleCategory[]>;
  constructor(
    private readonly store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(vehicleCategoryParamsChange({payload: null}));
    this.datas$ = this.store.select(selectListVehicleCategories);
  }

}
