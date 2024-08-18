import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SETTING } from '../core/configs/setting.config';
import { CompanyComponent } from './company/company.component';
import { BlogComponent } from './blog/blog.component';
import { NotificationComponent } from './notification/notification.component';
import { ServicePackComponent } from './service-pack/service-pack.component';
import { OrderApprovalComponent } from './order-approval/order-approval.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ReportComponent} from "./report/report.component";

export const routes: Routes = [
  { path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full' },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_USER,
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
    path: SETTING.SYSTEM_PAGE.MANAGER_NOTIFICATION,
    component: NotificationComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_SERVICE_PACK,
    component: ServicePackComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_ORDER_APPROVAL,
    component: OrderApprovalComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.MANAGER_RECRUITMENT,
    component: RecruitmentComponent,
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
export class AdminRoutesModule {}
