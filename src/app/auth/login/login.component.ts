import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  isPassword, removeQuotes,
  saveToLocalStorage,
} from '../../core/commons/func';
import { SETTING } from '../../core/configs/setting.config';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  private isValidAuth(): string {
    if (!isEmail(this.email)) {
      return SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
    } else if (!isPassword(this.password)) {
      return SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_FORMAT;
    }

    return '';
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public onLogin(): void {
    const errorMessage = this.isValidAuth();
    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return;
    }

    let payload: any = {
      email: this.email,
      password: this.password,
    };

    this.loadingService.show();
    this.authService.login(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          setTimeout(() => {
            this.loadingService.hide();
            saveToLocalStorage('userID', result.data['userID']);
            saveToLocalStorage('token', result.data['token']);
            saveToLocalStorage('role', result.data['role']);
            saveToLocalStorage('email', result.data['email']);
            saveToLocalStorage('avatar', result.data['avatar']);
            saveToLocalStorage('companyID', result.data['companyID']);

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.ADMIN) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_ADMIN + '/' + this.SYSTEM_PAGE.MANAGER_ORDER_APPROVAL
              );
            }

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.EMPLOYER) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_EMPLOYER + '/' + this.SYSTEM_PAGE.DASHBOARD
              );
            }

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.CANDIDATE) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_CANDIDATE + '/' + this.SYSTEM_PAGE.DASHBOARD
              );
            }

          }, 500);
        }
      },
      (error: any) => {
        this.loadingService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }
}
