import { NgModule } from '@angular/core';
import { AdminService } from './admin.service';
import { AdminRoutesModule } from './admin.routes';
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

@NgModule({
  imports: [
    AdminRoutesModule,
    PrimengModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  declarations: [DashboardComponent, UserComponent, MenuLeftComponent],
  providers: [AdminService, RequestApiService],
})
export class AdminModule {}
