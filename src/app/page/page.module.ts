import { NgModule } from '@angular/core';
import { PageService } from './page.service';
import { PageRoutesModule } from './page.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { DialogUserComponent } from './user/dialog/dialog.component';
import { DialogCompanyComponent } from './company/dialog/dialog.component';
import { BlogComponent } from './blog/blog.component';
import { DialogBlogComponent } from './blog/dialog/dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { ServicePackComponent } from './service-pack/service-pack.component';
import { DialogServiceDialogComponent } from './service-pack/dialog/dialog.component';
import { CartComponent } from './cart/cart.component';
import { DynamicPipe } from '../core/pipes/dynamic-pipe';
import { DialogCartComponent } from './cart/dialog/dialog.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { OrderApprovalComponent } from './order-approval/order-approval.component';
import { SharedModule } from '../share/share.module';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { DialogRecruitmentComponent } from './recruitment/dialog/dialog.component';

@NgModule({
  imports: [PageRoutesModule, SharedModule],
  declarations: [
    DashboardComponent,
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
    CartComponent,
    DynamicPipe,
    DialogCartComponent,
    HistoryComponent,
    OrderComponent,
    OrderApprovalComponent,
    RecruitmentComponent,
    DialogRecruitmentComponent
  ],
  providers: [PageService],
})
export class PageModule {}
