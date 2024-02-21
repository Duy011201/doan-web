import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PrimengModule } from '../core/modules/primeng.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AuthRoutingModule, PrimengModule, FormsModule, ToastModule, MessagesModule, CommonModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  providers: [AuthService],
})
export class AuthModule {}
