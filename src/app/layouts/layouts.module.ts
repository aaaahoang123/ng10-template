import { NgModule } from '@angular/core';
import {IconsProviderModule} from '../icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import {WithSidebarLayoutComponent} from './with-sidebar-layout/with-sidebar-layout.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    WithSidebarLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
  ]
})
export class LayoutsModule { }
