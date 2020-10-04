import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActionCreator, Store} from '@ngrx/store';
import {Payload, setValueToForm} from '../../../core';
import {TypedAction} from '@ngrx/store/src/models';
import {FormGroupDirective} from '@angular/forms';
import {AppState} from '../../../app.state';
import {filter, takeUntil} from 'rxjs/operators';
import isEqual from 'lodash/isEqual';

@Directive({
  selector: '[appConnectedForm]'
})
export class ConnectedFormDirective implements OnInit, OnDestroy {
  @Input('appConnectedForm') data: Observable<any>;
  @Input() changeAction: ActionCreator<string, (props: Payload) => (Payload & TypedAction<string>)>;

  private destroy$ = new Subject();

  constructor(
      private formGroupDirective: FormGroupDirective,
      private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.data.pipe(
      filter(val => !!val && !isEqual(val, this.formGroupDirective.form.value)),
      takeUntil(this.destroy$)
    ).subscribe(val => setValueToForm(this.formGroupDirective.form, val, true));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(this.changeAction({payload: this.formGroupDirective.form.value}));
  }

}
