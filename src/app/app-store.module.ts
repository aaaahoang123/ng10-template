import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './modules/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthEffects} from './modules/auth/auth.effects';
import {regionReducer} from './modules/region/region.reducer';
import {voyageReducer} from './modules/voyage/voyge.reducer';
import {AppEffects} from './app.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authReducer,
      region: regionReducer,
      voyage: voyageReducer
    }),
    EffectsModule.forRoot([AppEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports: [StoreModule, EffectsModule],
  providers: []
})
export class AppStoreModule { }
