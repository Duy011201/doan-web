import { NgModule } from '@angular/core';
import { PageService } from './page.service';
import { PageRoutesModule } from './page.routes';
import { PrimengModule } from '../core/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { RequestApiService } from '../core/services/request-api.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { DialogUserComponent } from './user/dialog/dialog.component';
import { DialogCompanyComponent } from './company/dialog/dialog.component';
import { BlogComponent } from './blog/blog.component';
import { DialogBlogComponent } from './blog/dialog/dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuillModule } from 'ngx-quill';
import { ServicePackComponent } from './service-pack/service-pack.component';
import { DialogServiceDialogComponent } from './service-pack/dialog/dialog.component';
import { CartComponent } from './cart/cart.component';
import { DynamicPipe } from '../core/pipe/dynamic-pipe';
import { DialogCartComponent } from './cart/dialog/dialog.component';
import { HistoryComponent } from './history/history.component';
import { OrderComponent } from './order/order.component';
import { OrderApprovalComponent } from './order-approval/order-approval.component';

@NgModule({
  imports: [
    PageRoutesModule,
    PrimengModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    QuillModule,
  ],
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
  ],
  providers: [
    PageService,
    RequestApiService,
    ConfirmationService,
    MessageService,
  ],
})
export class PageModule {}
