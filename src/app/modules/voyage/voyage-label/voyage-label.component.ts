import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Voyage} from '../../../models/voyages';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';

@Component({
  selector: 'app-voyage-label',
  templateUrl: './voyage-label.component.html',
  styleUrls: ['./voyage-label.component.less']
})
export class VoyageLabelComponent implements OnInit {
  @Input() itemId: number;

  data$: Observable<Voyage>;
  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.data$ = this.store.pipe(
      select(state => state.voyage.entities[this.itemId])
    );
  }

}
