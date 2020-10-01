import { NgModule } from '@angular/core';
import {IconsProviderModule} from '../icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import {WithSidebarLayoutComponent} from './with-sidebar-layout/with-sidebar-layout.component';
import {CommonModule} from '@angular/common';
import { MiddleContentLayoutComponent } from './middle-content-layout/middle-content-layout.component';

@NgModule({
  declarations: [
    WithSidebarLayoutComponent,
    MiddleContentLayoutComponent
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
