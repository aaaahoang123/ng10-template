import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {WithSidebarLayoutComponent} from './layouts/with-sidebar-layout/with-sidebar-layout.component';
import {MiddleContentLayoutComponent} from './layouts/middle-content-layout/middle-content-layout.component';
import {AuthGuard} from './modules/auth/auth.guard';
import {MenuType} from './layouts/menu-type';
import {RouterEnum} from './core';

const routes: Routes = [
  {
    path: 'auth',
    component: MiddleContentLayoutComponent,
    data: {
      display: false
    },
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: WithSidebarLayoutComponent,
    data: {
      display: true,
      menuType: MenuType.NONE
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
        data: {
          display: false
        }
      },
      {
        path: 'dashboard',
        // component: RouterOutlet,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          display: true,
          icon: 'dashboard',
          title: 'Dashboard',
          menuType: MenuType.NONE
        }
      },
      {
        path: RouterEnum.voyages,
        // component: RouterOutlet,
        loadChildren: () => import('./modules/voyage/voyage.module').then(m => m.VoyageModule),
        data: {
          display: true,
          icon: 'ordered-list',
          title: 'Tuyến đường',
          menuType: MenuType.SUBMENU
        }
      },
      {
        path: RouterEnum.vehicle_categories,
        loadChildren: () => import('./modules/vehicle-category/vehicle-category.module').then(m => m.VehicleCategoryModule),
        canActivate: [AuthGuard],
        data: {
          display: true,
          icon: 'group',
          title: 'Nhóm xe',
          menuType: MenuType.SUBMENU
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
