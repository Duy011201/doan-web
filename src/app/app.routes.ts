import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {HomeComponent} from './page/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: {showHeader: false, showFooter: false},
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    data: {showHeader: true, showFooter: true},
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {showHeader: true, showFooter: true},
  },
];
