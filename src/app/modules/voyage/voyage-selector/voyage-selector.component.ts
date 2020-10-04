import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SimpleControlValueAccessor} from '../../../core';
import {InputBoolean} from 'ng-zorro-antd/core/util';
import {Observable} from 'rxjs';
import {Voyage} from '../../../models/voyages';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {voyageParamsChange} from '../voyge.reducer';
import {VoyageParams} from '../voyage.params';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-voyage-selector',
  templateUrl: './voyage-selector.component.html',
  styleUrls: ['./voyage-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VoyageSelectorComponent),
      multi: true
    }
  ]
})
export class VoyageSelectorComponent extends SimpleControlValueAccessor<number> implements OnInit {
  @Input() @InputBoolean() nzAllowClear;

  voyage$: Observable<Voyage[]>;
  constructor(
    private readonly store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.voyage$ = this.store.pipe(
      select(state => state.voyage.ids.map(id => state.voyage.entities[id]))
    );

    this.store.dispatch(voyageParamsChange({payload: new VoyageParams()}));
  }

  onSelect($event: number): void {
    this.model = $event;
    this.propagateChange?.($event);
  }
}
