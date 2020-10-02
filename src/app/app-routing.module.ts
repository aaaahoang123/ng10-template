import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {WithSidebarLayoutComponent} from './layouts/with-sidebar-layout/with-sidebar-layout.component';
import {MiddleContentLayoutComponent} from './layouts/middle-content-layout/middle-content-layout.component';
import {AuthGuard} from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
    data: {
      display: false
    }
  },
  {
    path: 'welcome',
    component: WithSidebarLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule),
    data: {
      display: true,
      icon: 'dashboard',
      title: 'Dashboard'
    }
  },
  {
    path: 'welcome2',
    component: WithSidebarLayoutComponent,
    loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule),
    data: {
      display: true,
      icon: 'form',
      title: 'Form'
    }
  },
  {
    path: 'auth',
    component: MiddleContentLayoutComponent,
    data: {
      display: false
    },
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
