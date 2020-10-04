import {Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NzFormatEmitEvent, NzTreeNodeOptions} from 'ng-zorro-antd/tree';
import {Subject} from 'rxjs';
import {filter, switchMap, take, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../app.state';
import {loadCities, loadDistrictsOfCity} from '../region.reducer';
import cloneDeep from 'lodash/cloneDeep';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import {SimpleControlValueAccessor} from '../../../core';
import {SelectedRegionEvent} from './selected-region-event';

@Component({
  selector: 'app-region-selector',
  templateUrl: './region-selector.component.html',
  styleUrls: ['./region-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionSelectorComponent),
      multi: true
    }
  ]
})
export class RegionSelectorComponent extends SimpleControlValueAccessor<string | number> implements OnInit, OnDestroy, OnChanges {

  @Input() parentId: number;
  @Output() selectedRegion = new EventEmitter<SelectedRegionEvent>();

  private destroy$ = new Subject();
  nodes: NzTreeNodeOptions[];
  private expandedNodes = new Set<string>();

  constructor(
    private readonly store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadCities());

    this.store
      .pipe(
        select(state => state.region.treeNodes),
        filter((nodes) => !isEqual(this.nodes, nodes)),
        takeUntil(this.destroy$)
      )
      .subscribe(nodes => this.nodes = cloneDeep(nodes).map(node => { node.expanded = this.expandedNodes.has(node.key); return node; }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.parentId && this.parentId) {
      this.store.dispatch(loadDistrictsOfCity({payload: this.parentId}));
    }
  }

  onExpandChange($event: NzFormatEmitEvent): void {
    const node = $event.node;
    $event.node.isExpanded
      ? this.expandedNodes.add(node.key)
      : this.expandedNodes.delete(node.key);

    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.store.dispatch(loadDistrictsOfCity({payload: node.key as any}));
      this.store
        .pipe(
          select(state => state.region.districtIdsMap[node.key]),
          filter((ids) => !!ids?.length),
          switchMap(() =>
            this.store.pipe(select(state => state.region.treeNodes.find(storeNode => node.key === storeNode.key)))
          ),
          take(1)
        )
        .subscribe(storeNode => {
          node?.addChildren([]);
        });
    }
  }

  onModelChange($event: string | number): void {
    const region: SelectedRegionEvent = {
      district_id: 0,
      province_id: 0
    };
    if (isNumber($event)) {
      region.province_id = $event;
    } else if (isString($event)) {
      const splitString = $event.split('-');
      region.province_id = parseInt(splitString[0], 10);
      // @ts-ignore
      region.district_id = !isNaN(splitString[1]) ? parseInt(splitString[1], 10) : splitString[1];
    }
    this.selectedRegion.emit(region);
    this.propagateChange?.($event);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
