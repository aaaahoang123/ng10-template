import { Component, OnInit } from '@angular/core';
import {CommonStatus} from '../../../common/enum/common-status';
import {FormArray, FormGroup} from '@angular/forms';
import {AutoSyncRouterIdComponent, createForm} from '../../../core';
import {VehicleCategoryForm, VehicleSeatForm} from '../vehicle-category.state';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import {AppState} from '../../../app.state';
import {submitVehicleCategoryForm, vehicleCategoryFormChanged, vehicleCategoryFormIdChange} from '../vehicle-category.reducer';
import {selectVehicleCategoryFormData, selectVehicleCategoryFormId, selectVehicleCategoryFormLoading} from '../vehicle-category.selectors';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-category-form',
  templateUrl: './vehicle-category-form.component.html',
  styleUrls: ['./vehicle-category-form.component.less']
})
export class VehicleCategoryFormComponent extends AutoSyncRouterIdComponent implements OnInit {
  CommonStatus = CommonStatus;
  form: FormGroup;
  formId$: Observable<number>;
  formData$: Observable<VehicleCategoryForm>;
  loading$: Observable<boolean>;
  vehicleCategoryFormChanged = vehicleCategoryFormChanged;

  seatGridColumn = 6;

  protected onFormIdChangeAction = vehicleCategoryFormIdChange;

  numberFormatter = (val: number) => val && val.toLocaleString('us');
  constructor(
    store: Store<AppState>,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    super(store, router, activatedRoute);
  }

  ngOnInit(): void {
    this.form = createForm(new VehicleCategoryForm()) as FormGroup;

    this.formId$ = this.store.select(selectVehicleCategoryFormId);
    this.formData$ = this.store.select(selectVehicleCategoryFormData);
    this.loading$ = this.store.select(selectVehicleCategoryFormLoading);

    this.onColChange(this.form.get('cols').value);

    super.ngOnInit();
  }

  doSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(submitVehicleCategoryForm({payload: this.form.value}));
  }

  onColChange($event: number): void {
    const largesMultiplesOfCols = 24 - 24 % $event;
    this.seatGridColumn = largesMultiplesOfCols / $event;
    this.onSeatGridChange();
  }

  onSeatGridChange(): void {
    const seats = this.form.get('vehicle_seats') as FormArray;
    const rows = this.form.get('rows').value;
    const cols = this.form.get('cols').value;

    const newControl = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let selectedControl = seats.at(cols * row + col);
        if (selectedControl) {
          selectedControl.get('p_col').setValue(col);
          selectedControl.get('p_row').setValue(row);
        } else {
          selectedControl = createForm(new VehicleSeatForm(col, row));
        }
        newControl.push(selectedControl);
      }
    }
    seats.clear();
    newControl.forEach(control => seats.push(control));

    // this.form.setControl('vehicle_seats', new FormArray(newControl));
  }
}
