import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HomeComponent } from './page/home/home.component';
import { CONSTANT } from './core/settings/const.setting';

export const routes: Routes = [
  { path: '', redirectTo: CONSTANT.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full' },
  {
    path: CONSTANT.SYSTEM_PAGE.HEADER_HOME,
    component: HomeComponent,
    data: { showHeader: true, showFooter: true },
  },
  {
    path: CONSTANT.SYSTEM_PAGE.RELATED_AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: { showHeader: false, showFooter: false },
  },
  {
    path: CONSTANT.SYSTEM_PAGE.RELATED_ADMIN,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: { showHeader: true, showFooter: true },
  },
  {
    path: CONSTANT.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
    data: { showHeader: true, showFooter: true },
  },
];
