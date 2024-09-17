import {NgModule} from '@angular/core';
import {AdminService} from './admin.service';
import {AdminRoutesModule} from './admin.routes';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {UserComponent} from './user/user.component';
import {CompanyComponent} from './company/company.component';
import {DialogUserComponent} from './user/dialog/dialog.component';
import {DialogCompanyComponent} from './company/dialog/dialog.component';
import {BlogComponent} from './blog/blog.component';
import {DialogBlogComponent} from './blog/dialog/dialog.component';
import {NotificationComponent} from './notification/notification.component';
import {ServicePackComponent} from './service-pack/service-pack.component';
import {DialogServiceDialogComponent} from './service-pack/dialog/dialog.component';
import {OrderApprovalComponent} from './order-approval/order-approval.component';
import {SharedModule} from '../share/share.module';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {DialogRecruitmentComponent} from './recruitment/dialog/dialog.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ReportComponent} from "./report/report.component";
import {SkeletonModule} from "primeng/skeleton";

@NgModule({
    imports: [AdminRoutesModule, SharedModule, SkeletonModule],
  declarations: [
    MenuLeftComponent,
    UserComponent,
    DialogUserComponent,
    CompanyComponent,
    DialogCompanyComponent,
    BlogComponent,
    DialogBlogComponent,
    NotificationComponent,
    ServicePackComponent,
    DialogServiceDialogComponent,
    OrderApprovalComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent,
    ChangePasswordComponent,
    ReportComponent
  ],
  providers: [AdminService],
})
export class AdminModule {
}
