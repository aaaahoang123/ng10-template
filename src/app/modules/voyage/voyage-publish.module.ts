import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {VoyageSelectorComponent} from './voyage-selector/voyage-selector.component';
import {EffectsModule} from '@ngrx/effects';
import {VoyageEffects} from './voyage.effects';
import {VoyageLabelComponent} from './voyage-label/voyage-label.component';
import {ReactiveComponentModule} from '@ngrx/component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzMessageModule} from 'ng-zorro-antd/message';

const declarations = [VoyageSelectorComponent, VoyageLabelComponent];

@NgModule({
  declarations,
  imports: [
    SharedModule,
    EffectsModule.forFeature([VoyageEffects]),
    NzSelectModule,
    NzMessageModule,
    ReactiveComponentModule
  ],
  exports: [
    ...declarations
  ]
})
export class VoyagePublishModule { }
