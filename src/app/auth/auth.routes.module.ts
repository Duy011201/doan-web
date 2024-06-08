import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { SETTING } from '../core/configs/setting.config';

const routes: Routes = [
  {
    path: SETTING.SYSTEM_PAGE.AUTH_LOGIN,
    component: LoginComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.AUTH_REGISTER,
    component: RegisterComponent,
  },
  {
    path: SETTING.SYSTEM_PAGE.AUTH_FORGOT_PASSWORD,
    component: ForgotPasswordComponent,
  },
  { path: '', redirectTo: SETTING.SYSTEM_PAGE.AUTH_LOGIN, pathMatch: 'full' },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutesModule {}
