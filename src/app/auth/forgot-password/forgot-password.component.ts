import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { isEmail, isEmpty, isPassword } from '../../core/commons/func';
import { SETTING } from '../../core/configs/setting.config';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  public authForgotPassword: any = {
    email: '',
    password: '',
    verifyCode: '',
    isPolicy: true,

    isStep: false,
  };

  public SYSTEM_PAGE = SETTING.SYSTEM_PAGE;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {}

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }
  apiForgotPassword(): void {
    if (this.validAuthInput()) {
      const payload = {
        email: this.authForgotPassword.email,
        password: this.authForgotPassword.password,
        verifyCode: this.authForgotPassword.verifyCode,
      };

      this.loadingService.show();
      this.authService.forgotPassword(payload).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: result['message'],
              });
            setTimeout(() => {
              this.loadingService.hide();
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
              }, 2000);
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

  validAuthInput(): boolean {
    let errorMessage = '';

    if (!isEmail(this.authForgotPassword.email)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
    } else if (!isPassword(this.authForgotPassword.password)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_FORMAT;
    } else if (isEmpty(this.authForgotPassword.isPolicy)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_POLICY;
    }

    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return false;
    }

    return true;
  }

  apiVerifyCode(): void {
    this.loadingService.show();
    if (this.validAuthInput()) {
      const payload = {
        email: this.authForgotPassword.email,
      };

      this.authService.verifyCode(payload).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result['message'],
            });
            setTimeout(() => {
              this.loadingService.hide();
              this.authForgotPassword.isStep = true;
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
}
