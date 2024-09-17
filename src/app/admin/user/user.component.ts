import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { AdminService } from '../admin.service';
import { environment } from '../../core/environments/develop.environment';
import { CONSTANT } from '../../core/configs/constant.config';
import { LoadingService } from '../../core/services/loading.service';
import {getFromLocalStorage, removeQuotes} from "../../core/commons/func";

@Component({
  selector: 'app-admin-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  LIST_SYSTEM_STATUS = CONSTANT.SYSTEM_STATUS;
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_SYSTEM_ROLE = CONSTANT.SYSTEM_ROLE;
  isYou = removeQuotes(getFromLocalStorage('userID'))

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {}

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  listUser: any = [];
  visible: boolean = false;
  loading: boolean = true;
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.apiGetAll();
  }

  clear(table: Table) {
    table.clear();
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = { ...data };

    switch (action) {
      case this.SYSTEM_ACTION.VIEW:
        this.dataDialog.headerDialog = 'View user';
        this.dataDialog.subHeaderDialog = 'View user information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create user';
        this.dataDialog.subHeaderDialog = 'Create user information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update user';
        this.dataDialog.subHeaderDialog = 'Update user information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, user: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.apiDelete(user);
      },
      reject: () => {},
    });
  }

  confirmLock(event: Event, user: any, status: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want ${status === this.SYSTEM_STATUS.LOCK ? 'lock' : 'open'} user?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.apiLock(user, status);
      },
      reject: () => {},
    });
  }

  confirmResetPassword(event: Event, user: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want reset default password?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.apiResetPassword(user);
      },
      reject: () => {},
    });
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll();
  }

  apiResetPassword(user: any) {
    this.service.resetPassword({ userID: user.userID }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiLock(user: any, status: string) {
    this.service.lockUser({ userID: user.userID, status: status }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiDelete(user: any) {
    this.service.deleteUser({ userID: user.userID }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiGetAll() {
    this.loadingService.show();
    this.service.getAllUser({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listUser = result.data;
            this.loading = false;
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
