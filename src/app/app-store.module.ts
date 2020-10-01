import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffect} from './auth.effect';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authReducer
    }),
    EffectsModule.forRoot([AuthEffect])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [ AuthEffect ]
})
export class AppStoreModule { }
