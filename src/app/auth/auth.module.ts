import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {LoginComponent} from './login/login.component';
import {AuthRoutesModule} from './auth.routes';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {PrimengModule} from '../core/modules/primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RequestApiService} from '../core/services/request-api.service';

@NgModule({
  imports: [AuthRoutesModule, PrimengModule, FormsModule, ToastModule, MessagesModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  providers: [AuthService, RequestApiService],
})
export class AuthModule {
}
