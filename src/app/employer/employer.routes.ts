import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from '../component/page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SETTING} from '../core/configs/setting.config';
import {BlogComponent} from "./blog/blog.component";
import {NotificationComponent} from "./notification/notification.component";
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ReportComponent} from "./report/report.component";

export const routes: Routes = [
  {path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full'},
  {
    path: SETTING.SYSTEM_PAGE.DASHBOARD,
    component: DashboardComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_BLOG,
    component: BlogComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_NOTIFICATION,
    component: NotificationComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_CART,
    component: CartComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_HISTORY,
    component: HistoryComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_RECRUITMENT,
    component: RecruitmentComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_PROCESS,
    component: RecruitmentProcessComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_CHANGE_PASSWORD,
    component: ChangePasswordComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_REPORT,
    component: ReportComponent,
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
export class EmployerRoutesModule {
}
