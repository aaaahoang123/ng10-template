import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  testVoyage: any;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    console.log(this.router);
  }

}
