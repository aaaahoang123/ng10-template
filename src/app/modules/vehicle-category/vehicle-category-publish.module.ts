import {NgModule} from '@angular/core';
import {VehicleCategorySelectorComponent} from './vehicle-category-selector/vehicle-category-selector.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {VehicleCategoryEffects} from './vehicle-category.effects';
import {ReactiveComponentModule} from '@ngrx/component';
import {NzSelectModule} from 'ng-zorro-antd/select';

@NgModule({
  declarations: [VehicleCategorySelectorComponent],
  imports: [
    SharedModule,
    NzSelectModule,
    EffectsModule.forFeature([VehicleCategoryEffects]),
    ReactiveComponentModule
  ]
})
export class VehicleCategoryPublishModule {
}
