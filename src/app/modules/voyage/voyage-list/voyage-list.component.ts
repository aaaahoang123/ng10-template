import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {Observable} from 'rxjs';
import {Voyage} from '../../../models/voyages';
import {VoyageParams} from '../voyage.params';
import {PaginationMeta} from '../../../models/pagination-meta.interface';
import {deleteVoyage, voyageParamsChange} from '../voyge.reducer';
import {CommonStatus} from '../../../common/enum/common-status';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.less']
})
export class VoyageListComponent implements OnInit {
  data$: Observable<Voyage[]>;
  params$: Observable<VoyageParams>;
  meta$: Observable<PaginationMeta>;

  CommonStatus = CommonStatus;

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.data$ = this.store.pipe(
      select(state => state.voyage.ids.map(id => state.voyage.entities[id]))
    );

    this.params$ = this.store.pipe(
      select(state => state.voyage.params)
    );

    this.meta$ = this.store.pipe(
      select(state => state.voyage.listMeta)
    );
  }

  onPageSizeChange($event: number): void {
    this.store.dispatch(
      voyageParamsChange({payload: {limit: $event}, extra: true})
    );
  }

  onPageChange($event: number): void {
    this.store.dispatch(
      voyageParamsChange({payload: {page: $event}, extra: true})
    );
  }

  doDelete(id: number): void {
    this.store.dispatch(deleteVoyage({payload: id}));
  }
}
