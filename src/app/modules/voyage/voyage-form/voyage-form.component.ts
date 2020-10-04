import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {createForm, dirtyForm} from '../../../core';
import {VoyageFormData, VoyagePoint} from '../voyage.state';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {SelectedRegionEvent} from '../../region/region-selector/selected-region-event';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {submitVoyageForm, voyageFormChanged, voyageFormIdChanged} from '../voyge.reducer';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-voyage-form',
  templateUrl: './voyage-form.component.html',
  styleUrls: ['./voyage-form.component.less']
})
export class VoyageFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSaving$: Observable<boolean>;
  formId: string;

  formData$: Observable<VoyageFormData>;
  formDataChange = voyageFormChanged;

  private destroy$ = new Subject();
  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = createForm(new VoyageFormData()) as FormGroup;

    this.formData$ = this.store.pipe(
      select(state => state.voyage.formData)
    );

    this.isSaving$ = this.store.pipe(
      select(state => state.voyage.formRequesting)
    );

    this.syncWithRouteId();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => this.syncWithRouteId());
  }

  syncWithRouteId(): void {
    let selectedRoute = this.activatedRoute;
    while (selectedRoute.firstChild) {
      selectedRoute = selectedRoute.firstChild;
    }
    const id = selectedRoute.snapshot.params.id || null;
    this.formId = id;
    this.store.dispatch(voyageFormIdChanged({payload: id}));
  }

  submitForm(): void {
    const voyages = this.form.get('voyages') as FormArray;
    const invalid = voyages.controls.reduce((result, region) => {
      dirtyForm(region as FormGroup);
      return region.invalid ? region.invalid : result;
    }, false);

    if (invalid) {
      return;
    }
    this.store.dispatch(submitVoyageForm({payload: this.form.value}));
  }

  drop($event: CdkDragDrop<any, any>): void {
    const voyages = this.form.get('voyages') as FormArray;
    const formItem = voyages.at($event.previousIndex);
    voyages.removeAt($event.previousIndex);
    voyages.insert($event.currentIndex, formItem);
  }

  removeItem(i: number): void {
    const voyages = this.form.get('voyages') as FormArray;
    voyages.removeAt(i);
  }

  addRecord(): void {
    const voyages = this.form.get('voyages') as FormArray;
    voyages.push(createForm(new VoyagePoint()));
  }

  onSelectRegion($event: SelectedRegionEvent, i: number): void {
    const voyages = this.form.get('voyages') as FormArray;
    const workingForm = voyages.at(i) as FormGroup;
    workingForm.get('province_id').setValue($event.province_id);
    workingForm.get('district_id').setValue($event.district_id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
