import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthRoutesModule } from './auth.routes.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../share/share.module';

@NgModule({
  imports: [AuthRoutesModule, SharedModule],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  providers: [AuthService],
})
export class AuthModule {}
