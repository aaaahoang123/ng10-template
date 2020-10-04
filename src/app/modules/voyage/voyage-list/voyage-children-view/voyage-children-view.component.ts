import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-voyage-children-view',
  templateUrl: './voyage-children-view.component.html',
  styleUrls: ['./voyage-children-view.component.less']
})
export class VoyageChildrenViewComponent implements OnInit {
  @Input() parentId: number;

  childrenIds$: Observable<number[]>;
  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.childrenIds$ = this.store.pipe(
      select(state => state.voyage.childrenMapper[this.parentId])
    );
  }

}
