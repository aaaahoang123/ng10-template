import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {IconsProviderModule} from '../../icons-provider.module';

@NgModule({
  declarations: [UploadComponent],
  exports: [
    UploadComponent
  ],
  imports: [
    SharedModule,
    NzUploadModule,
    IconsProviderModule,
    NzModalModule
  ]
})
export class UploadModule { }
