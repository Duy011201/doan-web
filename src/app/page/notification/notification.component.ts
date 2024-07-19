import { Component } from '@angular/core';
import { SETTING } from '../../core/configs/setting.config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageService } from '../page.service';
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

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_ROLE: any = CONSTANT.SYSTEM_ROLE;
  LIST_SYSTEM_STATUS = CONSTANT.SYSTEM_STATUS;

  constructor(
    private messageService: MessageService,
    private service: PageService
  ) {}

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  listUser: any = [];
  visible: boolean = false;
  loading: boolean = true;
  dataSendNotificationEmail: any = {
    userID: null,
    role: null,
    content: '',
  };
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.apiGetAll();
  }

  clear(table: Table) {
    table.clear();
  }

  private validInput(): boolean {
    let errorMessage = '';

    if (isEmpty(this.dataSendNotificationEmail.content)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_CONTENT;
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

  public async onSendNotificationEmail(): Promise<void> {
    if (this.validInput()) {
      this.dataSendNotificationEmail = trimStringObject(
        this.dataSendNotificationEmail
      );
      const payload = {
        userID: this.dataSendNotificationEmail?.userID || '',
        role: this.dataSendNotificationEmail?.role?.CODE || '',
        content: this.dataSendNotificationEmail.content,
      };

      this.service.sendNotificationEmail(payload).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.dataSendNotificationEmail = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
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
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll();
  }

  onChoseUserSendNotification(item: any) {
    this.dataSendNotificationEmail.userID = item.userID;
  }

  apiGetAll() {
    this.service.getAllUser({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listUser = result.data;
          this.loading = false;
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
}
