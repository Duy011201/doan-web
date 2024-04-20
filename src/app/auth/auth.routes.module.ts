import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from '../component/page-not-found/page-not-found.component';
import { CONSTANT } from '../core/settings/const.setting';

const routes: Routes = [
  {
    path: CONSTANT.SYSTEM_PAGE.AUTH_LOGIN,
    component: LoginComponent,
  },
  {
    path: CONSTANT.SYSTEM_PAGE.AUTH_REGISTER,
    component: RegisterComponent,
  },
  {
    path: CONSTANT.SYSTEM_PAGE.AUTH_FORGOT_PASSWORD,
    component: ForgotPasswordComponent,
  },
  { path: '', redirectTo: CONSTANT.SYSTEM_PAGE.AUTH_LOGIN, pathMatch: 'full' },
  {
    path: CONSTANT.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutesModule {}
