import { Component } from '@angular/core';
import { SETTING } from '../../core/configs/setting.config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../admin.service';
import { environment } from '../../core/environments/develop.environment';
import { Table } from 'primeng/table';
import { CONSTANT } from '../../core/configs/constant.config';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../core/commons/func';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-admin-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private loadingService: LoadingService
  ) {}

  visible: boolean = false;
  loading: boolean = true;
  data: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  pathEnvironment = environment.API_URL;

  ngOnInit() {}

  public async changePassword(): Promise<void> {
    let errorMessage = '';

    if (isEmpty(this.data.oldPassword)) {
      errorMessage = 'Bạn chưa nhập mật khẩu cũ';
    } else if (isEmpty(this.data.newPassword)) {
      errorMessage = 'Bạn chưa nhập mật khẩu mới';
    } else if (this.data.newPassword !== this.data.confirmPassword) {
      errorMessage = 'Bạn nhập mật khẩu không khớp';
    }

    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return;
    }

    let payload = {
      userID: removeQuotes(getFromLocalStorage('userID')),
      oldPassword: this.data.oldPassword,
      newPassword: this.data.newPassword,
    };

    this.loadingService.show();
    this.service.changePasswordUser(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
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
