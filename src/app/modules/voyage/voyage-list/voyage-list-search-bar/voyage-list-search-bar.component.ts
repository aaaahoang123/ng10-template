import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonStatus} from '../../../../common/enum/common-status';
import {FormGroup} from '@angular/forms';
import {createForm} from '../../../../core';
import {VoyageParams} from '../../voyage.params';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../app.state';
import {voyageParamsChange} from '../../voyge.reducer';

@Component({
  selector: 'app-voyage-list-search-bar',
  templateUrl: './voyage-list-search-bar.component.html',
  styleUrls: ['./voyage-list-search-bar.component.less']
})
export class VoyageListSearchBarComponent implements OnInit, OnDestroy {
  CommonStatus = CommonStatus;
  cityId: number;
  districtId: number;
  status: CommonStatus;

  destroy$ = new Subject();

  paramsForm: FormGroup;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let initialParams = this.activatedRoute.snapshot.queryParams;
    if (!Object.keys(initialParams ?? {}).length) {
      initialParams = null;
    }
    this.store.dispatch(voyageParamsChange({payload: initialParams, extra: true}));
    this.paramsForm = createForm(new VoyageParams()) as FormGroup;

    this.store.pipe(
      select(state => state.voyage.params),
      take(1)
    ).subscribe(val => this.paramsForm.setValue(val));

    this.paramsForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.store.dispatch(voyageParamsChange({payload: value, extra: true})));
  }

  onSelectCity(cityId: number): void {
    if (cityId !== this.cityId) {
      this.cityId = cityId;
      this.districtId = null;
      this.paramsForm.get('from_or_to').setValue(cityId);
    }
  }

  onSelectDistrict(districtId: number): void {
    this.districtId = districtId;
    this.paramsForm.get('from_or_to').setValue(this.districtId ?? this.cityId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
