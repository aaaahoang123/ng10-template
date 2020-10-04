import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigateButton} from '../../../core/navigate-button';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.less']
})
export class TitleHeaderComponent implements OnInit, OnDestroy {
  pageTitle = '';
  navigateButtons?: NavigateButton[];

  private destroy$ = new Subject();
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly title: Title
  ) { }

  ngOnInit(): void {
    this.syncRouteData();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => this.syncRouteData());
  }

  syncRouteData(): void {
    let selectedRoute = this.activatedRoute;
    while (selectedRoute.firstChild) {
      selectedRoute = selectedRoute.firstChild;
    }
    this.pageTitle = selectedRoute.snapshot.data?.title;
    this.navigateButtons = selectedRoute.snapshot.data?.navigateButtons;
    this.title.setTitle(this.pageTitle);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
