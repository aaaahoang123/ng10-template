import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { VehicleCategoryFormComponent } from './vehicle-category-form/vehicle-category-form.component';
import { VehicleCategoryTableComponent } from './vehicle-category-table/vehicle-category-table.component';
import {VehicleCategoryPublishModule} from './vehicle-category-publish.module';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {InputNumberModule} from '../../common/input-number/input-number.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {IconsProviderModule} from '../../icons-provider.module';
import {ReactiveComponentModule} from '@ngrx/component';
import {RouterModule, Routes} from '@angular/router';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {RouterEnum} from '../../core';
import {NavigateButton} from '../../core/navigate-button';

const {list, create, edit, vehicle_categories} = RouterEnum;

const routes: Routes = [
  {
    path: list,
    component: VehicleCategoryTableComponent,
    data: {
      display: true,
      title: 'DS nhóm xe',
      navigateButtons: [
        {
          title: 'Tạo nhóm xe',
          navigate: ['/', vehicle_categories, create]
        } as NavigateButton
      ]
    }
  },
  {
    path: create,
    component: VehicleCategoryFormComponent,
    data: {
      display: true,
      title: 'Tạo nhóm xe'
    }
  },
  {
    path: `${edit}/:id`,
    component: VehicleCategoryFormComponent,
    data: {
      display: false,
      title: 'Sửa nhóm xe'
    }
  }
];

@NgModule({
  declarations: [VehicleCategoryFormComponent, VehicleCategoryTableComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    VehicleCategoryPublishModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    InputNumberModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzMessageModule,
    NzTableModule,
    NzPopconfirmModule,
    IconsProviderModule,
    ReactiveComponentModule,
    NzDividerModule
  ]
})
export class VehicleCategoryModule { }
