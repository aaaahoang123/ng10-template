import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Đăng nhập',
      display: true
    }
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    // EffectsModule.forRoot(
    //   [AuthEffects]
    // ),
    NzInputModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthEffects
  ]
})
export class AuthModule { }
