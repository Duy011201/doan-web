import {NgModule} from '@angular/core';
import {EmployerService} from './employer.service';
import {EmployerRoutesModule} from './employer.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {BlogComponent} from './blog/blog.component';
import {DialogBlogComponent} from './blog/dialog/dialog.component';
import {NotificationComponent} from './notification/notification.component';
import {CartComponent} from './cart/cart.component';
import {DialogCartComponent} from './cart/dialog/dialog.component';
import {HistoryComponent} from './history/history.component';
import {SharedModule} from '../share/share.module';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {DialogRecruitmentComponent} from './recruitment/dialog/dialog.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {DialogCompanyComponent} from "./dashboard/dialog/dialog.component";
import {ReportComponent} from "./report/report.component";

@NgModule({
  imports: [EmployerRoutesModule, SharedModule, PdfViewerModule],
  declarations: [
    DashboardComponent,
    MenuLeftComponent,
    BlogComponent,
    DialogBlogComponent,
    NotificationComponent,
    CartComponent,
    DialogCartComponent,
    HistoryComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent,
    ChangePasswordComponent,
    RecruitmentProcessComponent,
    DialogCompanyComponent,
    ReportComponent
  ],
  providers: [EmployerService],
  exports: [
    MenuLeftComponent
  ]
})
export class EmployerModule {
}
