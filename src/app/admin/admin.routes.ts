import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { CONSTANT } from '../core/settings/const.setting';

export const routes: Routes = [
  { path: '', redirectTo: CONSTANT.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full' },
  {
    path: CONSTANT.SYSTEM_PAGE.ADMIN_DASHBOARD,
    component: DashboardComponent,
  },
  {
    path: CONSTANT.SYSTEM_PAGE.ADMIN_MANAGER_USER,
    component: UserComponent,
  },
  {
    path: CONSTANT.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {}
