import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  testVoyage: any = null;
  testUpload: string[] = ['mYJJHxM0Sv-1601894501.jpg', 'bTRmGovc3Q-1601894541.jpg', '8PLkKdBlRh-1601894881.jpg'];
  formatter = value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parser = value => value.replace(/\$\s?|(,*)/g, '');
  pathToUrl = (path: string) => `${environment.domain}/images/upload/${path}`;

  constructor() { }

  ngOnInit(): void {
  }

  logUpload($event: any): void {
    console.log($event);
  }
}
