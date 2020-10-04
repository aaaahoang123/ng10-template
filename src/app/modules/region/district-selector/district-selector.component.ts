import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SimpleControlValueAccessor} from '../../../core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {Observable} from 'rxjs';
import {District} from '../../../models/regions/district.interface';
import {InputBoolean} from 'ng-zorro-antd/core/util';
import {loadDistrictsOfCity} from '../region.reducer';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-district-selector',
  templateUrl: './district-selector.component.html',
  styleUrls: ['./district-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistrictSelectorComponent),
      multi: true
    }
  ]
})
export class DistrictSelectorComponent extends SimpleControlValueAccessor<number> implements OnInit {
  // tslint:disable-next-line:variable-name
  private _cityId: number;
  @Input() @InputBoolean() allowClear = false;

  districts$: Observable<District[]>;

  constructor(
    private readonly store: Store<AppState>
  ) {
    super();
  }

  get cityId(): number {
    return this._cityId;
  }

  @Input()
  set cityId(value: number) {
    if (value !== this._cityId) {
      this._cityId = value;
      if (!!value) {
        this.store.dispatch(loadDistrictsOfCity({payload: value}));
      }
    }
  }

  ngOnInit(): void {
    this.districts$ = this.store.pipe(
      select(state => state.region.districtIdsMap[this.cityId || '']?.map(id => state.region.districts[id]))
    );
  }
}
