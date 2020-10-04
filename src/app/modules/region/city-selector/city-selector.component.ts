import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SimpleControlValueAccessor} from '../../../core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {Observable} from 'rxjs';
import {loadCities} from '../region.reducer';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {City} from '../../../models/regions/city.interface';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CitySelectorComponent),
      multi: true
    }
  ]
})
export class CitySelectorComponent extends SimpleControlValueAccessor<number> implements OnInit {
  cities$: Observable<City[]>;

  @Input() allowClear: boolean;

  constructor(
    private readonly store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadCities());
    this.cities$ = this.store.pipe(
      select(state => state.region.cityIds.map(id => state.region.cities[id]))
    );
  }
}
