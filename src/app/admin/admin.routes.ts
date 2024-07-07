import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from '../component/page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {SETTING} from '../core/configs/setting.config';
import {CompanyComponent} from "./company/company.component";
import {BlogComponent} from "./blog/blog.component";

export const routes: Routes = [
  {path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full'},
  {
    path: SETTING.SYSTEM_PAGE.DASHBOARD,
    component: DashboardComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.ADMIN_MANAGER_USER,
    component: UserComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_COMPANY,
    component: CompanyComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_BLOG,
    component: BlogComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutesModule {
}
