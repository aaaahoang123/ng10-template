import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import {LayoutsModule} from './layouts/layouts.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {AppStoreModule} from './app-store.module';
import {AuthModule} from './modules/auth/auth.module';
import {NZ_CONFIG, NzConfig} from 'ng-zorro-antd/core/config';
import {HttpClientInterceptor} from './common';
import {NzNotificationModule, NzNotificationService} from 'ng-zorro-antd/notification';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,
    NzNotificationModule,

    LoadingBarHttpClientModule,
    LoadingBarModule,

    AuthModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: NZ_CONFIG,
      useValue: {
        notification: {
          nzPlacement: 'bottomRight'
        },
        message: {
          nzTop: '90%'
        }
      } as NzConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
      deps: [NzNotificationService]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
