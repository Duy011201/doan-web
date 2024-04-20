import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import {
  containsSpecialCharacter,
  containsSpecialOrLetter,
  isEmail,
  isEmpty,
  saveToLocalStorage,
} from '../../core/commons/func';
import { CONSTANT } from '../../core/settings/const.setting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public SYSTEM_PAGE = CONSTANT.SYSTEM_PAGE;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  private isValidAuth(): string {
    if (!isEmail(this.email)) {
      return CONSTANT.SYSTEM_MESSAGE.INVALID_EMAIL_FORMAT;
    } else if (
      isEmpty(this.password) ||
      this.password.length < 5 ||
      this.password.length > 20
    ) {
      return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_FORMAT;
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

    this.authService.login(payload).subscribe(
      (result: any) => {
        saveToLocalStorage('userID', result.data['_userID']);
        saveToLocalStorage('token', result.data['_token']);
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
