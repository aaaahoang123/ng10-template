import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './modules/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthEffects} from './modules/auth/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authReducer
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports: [StoreModule, EffectsModule],
  providers: []
})
export class AppStoreModule { }
