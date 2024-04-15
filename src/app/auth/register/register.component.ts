import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CONSTANT} from '../../core/settings/const.setting'
import DVHCVN from '../../core/settings/json/dvhcvn.json';
import {
  containsSpecialCharacter,
  containsSpecialOrLetter,
  isEmail,
  isEmpty,
} from '../../core/commons/func';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public SYSTEM_PAGE = CONSTANT.SYSTEM_PAGE;

  // Default variable
  public isCandidate: boolean = true;
  public isRule: boolean = true;

  public listCompanyField: any[] | undefined;
  public listCompanyProvince: any[] | undefined;

  public authCandidate: any = {
    email: '',
    password: '',
    rePassword: '',
    verifyCode: '',
    isVerifyCode: false,
  };

  public authEmployer: any = {
    email: '',
    password: '',
    rePassword: '',
    verifyCode: '',
    isVerifyCode: false,
    isStep: false,
    companyName: '',
    companyField: undefined,
    companyProvince: undefined,
    companyEmail: '',
    companyCorporateTaxCode: '',
  };

  public STEP_KEY: any = {
    NEXT: 'next',
    PREV: 'prev'
  }

  public VERIFY_KEY: any = {
    CANDIDATE: 'candidate',
    EMPLOYER: 'employer'
  }

  constructor(private messageService: MessageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.listCompanyField = CONSTANT.COMPANY_FIELD;
    this.listCompanyProvince = DVHCVN.data;
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public onChangeCandidate(): void {
    this.isCandidate = !this.isCandidate;
  }

  public onChangeRule(): void {
    this.isRule = !this.isRule;
  }

  public onChangeVerifyCode(key: string, step: string, resend: boolean): void {
    const errorMessage = this.isValidAuth();
    let email;

    if (!isEmpty(errorMessage)) {
      this.onRegister();
      return;
    }

    if (key === this.VERIFY_KEY.CANDIDATE) {
      if (!resend) this.authCandidate.isVerifyCode = !this.authCandidate.isVerifyCode;
      email = this.authCandidate.email;
    } else if (key === this.VERIFY_KEY.EMPLOYER) {
      if (!resend) this.authEmployer.isVerifyCode = !this.authEmployer.isVerifyCode;
      email = this.authEmployer.email;
    }

    if (step === this.STEP_KEY.NEXT) {
      this.authService.verifyCode({email: email}).subscribe(
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

  public onChangeStep(key: object): void {
    if (key !== this.STEP_KEY.PREV) {
      const errorMessage = this.isValidAuth();
      if (!isEmpty(errorMessage)) {
        this.onRegister();
        return;
      }
    }

    // Reset default
    this.authEmployer.companyField = undefined;
    this.authEmployer.companyProvince = undefined;

    this.authEmployer.isStep = !this.authEmployer.isStep;
  }

  public onChangeAuthEmployer(key: string, variable: string, value: any): void {
    this.authEmployer[key] = value?.[variable];
  }

  private isValidAuth(): string {
    if (this.isCandidate) {
      if (!isEmail(this.authCandidate.email)) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_EMAIL_FORMAT;
      } else if (isEmpty(this.authCandidate.password) || this.authCandidate.password.length < 5
        || this.authCandidate.password.length > 20) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_FORMAT;
      } else if (this.authCandidate.password !== this.authCandidate.rePassword) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_NOT_MATCH;
      }
    }

    if (!this.isCandidate) {
      if (!isEmail(this.authEmployer.email)) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_EMAIL_FORMAT;
      } else if (isEmpty(this.authEmployer.password) || this.authEmployer.password.length < 5
        || this.authEmployer.password.length > 20) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_FORMAT;
      } else if (this.authEmployer.password !== this.authEmployer.rePassword) {
        return CONSTANT.SYSTEM_MESSAGE.INVALID_PASSWORD_NOT_MATCH;
      }

      if (this.authEmployer.isStep) {
        if (isEmpty(this.authEmployer.companyName) || containsSpecialCharacter(this.authEmployer.companyName)) {
          return CONSTANT.SYSTEM_MESSAGE.INVALID_COMPANY_NAME_FORMAT;
        } else if (!isEmail(this.authEmployer.companyEmail)) {
          return CONSTANT.SYSTEM_MESSAGE.INVALID_EMAIL_FORMAT;
        } else if (isEmpty(this.authEmployer.companyCorporateTaxCode)
          || containsSpecialOrLetter(this.authEmployer.companyCorporateTaxCode)) {
          return CONSTANT.SYSTEM_MESSAGE.INVALID_COMPANY_CORPORATE_TAX_CODE;
        } else if (isEmpty(this.authEmployer.companyField)) {
          return CONSTANT.SYSTEM_MESSAGE.INVALID_COMPANY_FIELD;
        } else if (isEmpty(this.authEmployer.companyProvince)) {
          return CONSTANT.SYSTEM_MESSAGE.INVALID_COMPANY_PROVINCE;
        }
      }
    }

    if (isEmpty(this.isRule)) {
      return CONSTANT.SYSTEM_MESSAGE.INVALID_RULE;
    }

    return '';
  }

  public onRegister(): void {
    const errorMessage = this.isValidAuth();
    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return;
    } else {
      let payload;

      if (this.isCandidate) {
        payload = {
          email: this.authCandidate.email,
          password: this.authCandidate.password,
          verifyCode: this.authCandidate.verifyCode,
          role: "candidate",
          desc: "Ứng viên"
        };
      } else {
        payload = {
          email: this.authEmployer.email,
          password: this.authEmployer.password,
          role: "employer",
          desc: "Nhà tuyển dụng",
          verifyCode: this.authCandidate.verifyCode,
          companyName: this.authEmployer.companyName,
          companyField: this.authEmployer.companyField,
          companyProvince: this.authEmployer.companyProvince,
          companyEmail: this.authEmployer.companyEmail,
          companyCorporateTaxCode: this.authEmployer.companyCorporateTaxCode,
        };
      }

      this.authService.register(payload).subscribe(
        (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result['message'],
          });
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000)
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
}
