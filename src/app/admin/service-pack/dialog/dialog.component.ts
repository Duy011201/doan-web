import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { AdminService } from '../../admin.service';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';

@Component({
  selector: 'app-admin-service-pack-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogServiceDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {}

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {}

  private validInput(): boolean {
    let errorMessage = '';

    if (isEmpty(this.data.servicePackName)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_NAME;
    } else if (isEmpty(this.data.price)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_PRICE;
    } else if (isEmpty(this.data.promotion)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_PRICE;
    } else if (isEmpty(this.data.content)) {
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

  public async onCreateUser(): Promise<void> {
    if (this.validInput()) {
      this.data = trimStringObject(this.data);

      const payload = {
        servicePackName: this.data.servicePackName,
        price: this.data.price,
        content: this.data.content,
        promotion: this.data.promotion,
        createdBy: removeQuotes(getFromLocalStorage('userID')),
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdateUser(): Promise<void> {
    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        servicePackID: this.data.servicePackID,
        servicePackName: this.data.servicePackName,
        price: this.data.price,
        content: this.data.content,
        promotion: this.data.promotion,
        updatedBy: removeQuotes(getFromLocalStorage('userID')),
      };

      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.adminService.createServicePack(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
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

  apiUpdate(payload: any) {
    this.adminService.updateServicePack(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
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
