import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { isEmail, isEmpty } from '../../core/commons/func';
import { CONSTANT } from '../../core/settings/const.setting';
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  // Default variable
  public isRule: boolean = true;
  public isStep: boolean = false;
  public isVerifyCode: boolean = false;

  public authForgotPassword: any = {
    email: '',
    password: '',
    rePassword: '',
    verifyCode: '',
  };

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  public onChangeRule(): void {
    this.isRule = !this.isRule;
  }

  public onChangeStep(): void {
    if (this.isVerifyCode && isEmpty(this.authForgotPassword.verifyCode)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: CONSTANT.SYSTEM_MESSAGE.INVALID_ENCRYPTION_AUTHENTICATION,
      });
      return;
    }

    this.isStep = !this.isStep;
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public onChangeVerifyCode(): void {
    this.isVerifyCode = !this.isVerifyCode;
  }

  private isValidAuth(): string {
    if (!isEmail(this.authForgotPassword.email)) {
      return CONSTANT.SYSTEM_MESSAGE.INVALID_EMAIL_FORMAT;
    }

    if (this.isStep) {
      if (
        isEmpty(this.authForgotPassword.password) ||
        this.authForgotPassword.password.length < 5 ||
        this.authForgotPassword.password.length > 20
      ) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_FORMAT;
      } else if (
        this.authForgotPassword.password !== this.authForgotPassword.rePassword
      ) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_NOT_MATCH;
      }
    }

    if (isEmpty(this.isRule)) {
      return CONSTANT.SYSTEM_MESSAGE.INVALID_RULE;
    }

    return '';
  }

  public onSendVerifyCode(resend: boolean): void {
    const errorMessage = this.isValidAuth();

    if (!isEmpty(errorMessage)) {
      this.onForgotPassword();
      return;
    }

    resend ? this.isVerifyCode = true : this.isVerifyCode = !this.isVerifyCode;

    this.authService
      .verifyCode({ email: this.authForgotPassword.email })
      .subscribe(
        (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result['message'],
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  public onForgotPassword(): void {
    const errorMessage = this.isValidAuth();
    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return;
    }

    const payload = {
      email: this.authForgotPassword.email,
      password: this.authForgotPassword.password,
      verifyCode: this.authForgotPassword.verifyCode,
    };

    this.authService.forgotPassword(payload).subscribe(
      (result: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: result['message'],
        });
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    );
  }
}
