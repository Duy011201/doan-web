import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CONSTANT} from '../../core/settings/const.setting'
import DVHCVN from '../../core/settings/json/dvhcvn.json';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  // Default variable
  public isCandidate: boolean = true;
  public isRule: boolean = true;
  public isStep: boolean = true;

  public listCompanyField: any[] | undefined;
  public listCompanyProvince: any[] | undefined;

  public authCandidate: any = {
    email: '',
    password: '',
    rePassword: '',
  };

  public authEmployer: any = {
    email: '',
    password: '',
    rePassword: '',
    status: false,
    companyName: '',
    companyField: undefined,
    companyProvince: undefined,
    companyEmail: '',
    companyCorporateTaxCode: '',
  };

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.listCompanyField = CONSTANT.COMPANY_FIELD;
    this.listCompanyProvince = DVHCVN.data;
    console.log(DVHCVN)
  }

  public onChangeCandidate(): void {
    this.isCandidate = !this.isCandidate;
  }

  public onChangeRule(): void {
    this.isRule = !this.isRule;
  }

  public onChangeStep(): void {
    this.isStep = !this.isStep;
  }

  public onChangeAuthEmployer(key: string, variable: string, value: any): void {
    this.authEmployer[key] = value?.[variable];
  }

  public onRegister(): void {
    // console.log('====================================');
    // console.log(this.authCandidate);
    // console.log(this.authEmployer);
    // console.log('====================================');

    console.log(this.authEmployer)

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
