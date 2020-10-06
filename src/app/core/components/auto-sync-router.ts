import {ActionCreator, Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Payload} from '../stores';
import {TypedAction} from '@ngrx/store/src/models';

@Component({
  template: ''
})
export abstract class AutoSyncRouterIdComponent implements OnInit, OnDestroy {
  formId: string;
  protected destroy$ = new Subject();
  protected routerParamsName = 'id';
  protected onFormIdChangeAction: ActionCreator<string, (props: Payload) => (Payload & TypedAction<string>)>;

  syncWithRouteId(): void {
    if (!this.onFormIdChangeAction) {
      throw Error('Please provide an formIdChange action by override the onFormIdChangeAction property!');
    }

    let selectedRoute = this.activatedRoute;
    while (selectedRoute.firstChild) {
      selectedRoute = selectedRoute.firstChild;
    }
    const id = selectedRoute.snapshot.params[this.routerParamsName] || null;
    this.formId = id;
    this.store.dispatch(this.onFormIdChangeAction({payload: id}));
  }

  protected constructor(
    protected store: Store<AppState>,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.syncWithRouteId();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => this.syncWithRouteId());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
