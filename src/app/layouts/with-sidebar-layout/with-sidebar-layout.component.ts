import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-with-sidebar-layout',
  templateUrl: './with-sidebar-layout.component.html',
  styleUrls: ['./with-sidebar-layout.component.less']
})
export class WithSidebarLayoutComponent implements OnInit {
  isCollapsed = false;
  constructor(
    public readonly router: Router
  ) { }

  ngOnInit(): void {
  }

}
