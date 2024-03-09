import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {CONSTANT} from "../../core/settings/const.setting";

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  // Default variable
  public isSendVerifyCode: boolean = false;
  public isRule: boolean = true;
  public isStep: boolean = true;

  public auth: any = {
    email: '',
    password: '',
    rePassword: '',
    verifyCode: '',
  };

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  public onChangeRule(): void {
    this.isRule = !this.isRule;
  }

  public onChangeStep(): void {
    this.isStep = !this.isStep;
  }

  public onReSendVerifyCode(): void {
    this.isSendVerifyCode = !this.isSendVerifyCode;
  }

  public onForgotPassword(): void {
    // console.log('====================================');
    // console.log(this.authCandidate);
    // console.log(this.authEmployer);
    // console.log('====================================');

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
