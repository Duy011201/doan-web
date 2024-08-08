import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from '../component/page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SETTING} from '../core/configs/setting.config';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

export const routes: Routes = [
  {path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full'},
  {
    path: SETTING.SYSTEM_PAGE.DASHBOARD,
    component: DashboardComponent,
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
