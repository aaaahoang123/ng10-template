import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RegionSelectorComponent} from './region-selector/region-selector.component';
import {NzTreeSelectModule} from 'ng-zorro-antd/tree-select';
import {EffectsModule} from '@ngrx/effects';
import {RegionEffects} from './region.effects';
import {ReactiveComponentModule} from '@ngrx/component';
import {CitySelectorComponent} from './city-selector/city-selector.component';
import {DistrictSelectorComponent} from './district-selector/district-selector.component';
import {NzSelectModule} from 'ng-zorro-antd/select';

const declarations = [
  RegionSelectorComponent,
  CitySelectorComponent,
  DistrictSelectorComponent
];

@NgModule({
  declarations,
  imports: [
    SharedModule,
    NzTreeSelectModule,
    NzSelectModule,
    EffectsModule.forFeature([RegionEffects]),
    ReactiveComponentModule
  ],
  exports: [
    ...declarations
  ]
})
export class ExportedRegionModule { }
