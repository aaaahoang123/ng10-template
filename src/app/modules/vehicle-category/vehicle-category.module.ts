import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { VehicleCategoryFormComponent } from './vehicle-category-form/vehicle-category-form.component';
import { VehicleCategoryTableComponent } from './vehicle-category-table/vehicle-category-table.component';
import {VehicleCategoryPublishModule} from './vehicle-category-publish.module';

@NgModule({
  declarations: [VehicleCategoryFormComponent, VehicleCategoryTableComponent],
  imports: [
    SharedModule,
    VehicleCategoryPublishModule
  ]
})
export class VehicleCategoryModule { }
