import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PrimengModule } from '../core/modules/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  providers: [AuthService],
})
export class AuthModule {}
