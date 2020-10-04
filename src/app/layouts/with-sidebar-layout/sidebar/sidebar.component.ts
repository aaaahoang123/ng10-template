import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteConfigLoadEnd, Router} from '@angular/router';
import {MenuType} from '../../menu-type';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean;

  MenuType = MenuType;
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
}
