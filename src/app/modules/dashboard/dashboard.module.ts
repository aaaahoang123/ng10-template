import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RouterEnum} from '../../core';
import {InputNumberModule} from '../../common/input-number/input-number.module';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';

const {} = RouterEnum;

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard', display: true, icon: 'dashboard' } }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    InputNumberModule,
    NzInputNumberModule
  ]
})
export class DashboardModule { }
