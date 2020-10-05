import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RouterEnum} from '../../core';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {UploadModule} from '../../common/upload/upload.module';
import {InputNumberModule} from '../../common/input-number/input-number.module';

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
    NzInputNumberModule,
    UploadModule
  ]
})
export class DashboardModule { }
