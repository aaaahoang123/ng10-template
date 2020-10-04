import { NgModule } from '@angular/core';
import {IconsProviderModule} from '../icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import {WithSidebarLayoutComponent} from './with-sidebar-layout/with-sidebar-layout.component';
import {CommonModule} from '@angular/common';
import { MiddleContentLayoutComponent } from './middle-content-layout/middle-content-layout.component';
import { HeaderComponent } from './with-sidebar-layout/header/header.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {ReactiveComponentModule} from '@ngrx/component';
import { TitleHeaderComponent } from './with-sidebar-layout/title-header/title-header.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import { SidebarComponent } from './with-sidebar-layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    WithSidebarLayoutComponent,
    MiddleContentLayoutComponent,
    HeaderComponent,
    TitleHeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzPageHeaderModule,
    ReactiveComponentModule
  ]
})
export class LayoutsModule { }
