import {NgModule} from '@angular/core';
import {VehicleCategorySelectorComponent} from './vehicle-category-selector/vehicle-category-selector.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {VehicleCategoryEffects} from './vehicle-category.effects';

@NgModule({
  declarations: [ VehicleCategorySelectorComponent ],
  imports: [
    SharedModule,
    EffectsModule.forFeature([VehicleCategoryEffects])
  ]
})
export class VehicleCategoryPublishModule { }
