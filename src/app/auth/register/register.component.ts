import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../core/configs/setting.config';
import {
  containsSpecialCharacter,
  containsSpecialOrLetter,
  isEmail,
  isEmpty,
  isPassword,
  trimStringObject,
} from '../../core/commons/func';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  public SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  public authCandidate: any = {
    email: '',
    password: '',
    confirmPassword: '',

    verifyCode: '',
    isPolicy: true,
    isStep: false,
  };
  public authEmployer: any = {
    email: '',
    password: '',
    confirmPassword: '',

    verifyCode: '',
    isPolicy: true,
    isStep: false,

    companyName: '',
    companyCorporateTaxCode: '',
  };

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

  private validAuthInput(type: string): boolean {
    let errorMessage = '';

    if (type === this.SYSTEM_ROLE.CANDIDATE) {
      if (!isEmail(this.authCandidate.email)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
      } else if (!isPassword(this.authCandidate.password)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_FORMAT;
      } else if (
        this.authCandidate.password !== this.authCandidate.confirmPassword
      ) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_NOT_MATCH;
      } else if (isEmpty(this.authCandidate.isPolicy)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_POLICY;
      }
    } else if (type === this.SYSTEM_ROLE.EMPLOYER) {
      if (!isEmail(this.authEmployer.email)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
      } else if (!isPassword(this.authEmployer.password)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_FORMAT;
      } else if (
        this.authEmployer.password !== this.authEmployer.confirmPassword
      ) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PASSWORD_NOT_MATCH;
      } else if (
        isEmpty(this.authEmployer.companyName) ||
        containsSpecialCharacter(this.authEmployer.companyName)
      ) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_COMPANY_NAME_FORMAT;
      } else if (
        isEmpty(this.authEmployer.companyCorporateTaxCode) ||
        containsSpecialOrLetter(this.authEmployer.companyCorporateTaxCode)
      ) {
        errorMessage =
          SETTING.SYSTEM_HTTP_MESSAGE.INVALID_COMPANY_CORPORATE_TAX_CODE;
      } else if (isEmpty(this.authEmployer.isPolicy)) {
        errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_POLICY;
      }
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

  public onRegisterCandidate(): void {
    if (this.validAuthInput(this.SYSTEM_ROLE.CANDIDATE)) {
      this.authCandidate = trimStringObject(this.authCandidate);
      const payload = {
        email: this.authCandidate.email,
        password: this.authCandidate.password,
        verifyCode: this.authCandidate.verifyCode,
        role: this.SYSTEM_ROLE.CANDIDATE,
      };
      this.apiRegister(payload);
    }
  }

  public onRegisterEmployer(): void {
    if (this.validAuthInput(this.SYSTEM_ROLE.EMPLOYER)) {
      this.authEmployer = trimStringObject(this.authEmployer);
      const payload = {
        email: this.authEmployer.email,
        password: this.authEmployer.password,
        role: this.SYSTEM_ROLE.EMPLOYER,
        verifyCode: this.authCandidate.verifyCode,
        companyName: this.authEmployer.companyName,
        companyEmail: this.authEmployer.companyEmail,
        companyCorporateTaxCode: this.authEmployer.companyCorporateTaxCode,
      };
      this.apiRegister(payload);
    }
  }

  onVerifyCode(type: string): void {
    if (type === this.SYSTEM_ROLE.CANDIDATE && this.validAuthInput(type))
      this.apiVerifyCode(type, { email: this.authCandidate.email });

    if (type === this.SYSTEM_ROLE.EMPLOYER && this.validAuthInput(type))
      this.apiVerifyCode(type, { email: this.authEmployer.email });
  }

  apiVerifyCode(type: string, payload: any): void {
    this.loadingService.show();
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
            if (type === this.SYSTEM_ROLE.CANDIDATE)
              this.authCandidate.isStep = true;

            if (type === this.SYSTEM_ROLE.EMPLOYER)
              this.authEmployer.isStep = true;
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

  apiRegister(payload: any): void {
    this.loadingService.show();
    this.authService.register(payload).subscribe(
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
