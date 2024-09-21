import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { AdminService } from '../../admin.service';
import {
  getFromLocalStorage,
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
  listFile: any = [];

  constructor(
    private messageService: MessageService,
    private service: AdminService
  ) {}

  ngOnInit() {}

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    if (this.data.actionDialog === this.SYSTEM_ACTION.CREATE) {
      this.data.promotion = 0
    }
  }

  private validInput(): boolean {
    let errorMessage = '';

    if (isEmpty(this.data.servicePackName)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_NAME;
    } else if (isEmpty(this.data.price) || this.data.price <= 0 || this.data.price > 100000000) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_PRICE;
    } else if (typeof this.data.promotion !== 'number' || this.data.promotion < 0 || this.data.promotion > 100) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_PROMOTION;
    } else if (isEmpty(this.data.expirationDate) || this.data.expirationDate <= 0 || this.data.expirationDate > 100) {
      errorMessage =
        SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SERVICE_PACK_EXPIRATION_DATE;
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

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.listFile.push(event.target.files[i]);
      }
    }
  }

  private uploadFile(payload: any, files: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.service.upload(payload, files).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            resolve(result.data);
          } else {
            reject(new Error('Upload failed'));
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || error.message,
          });
          reject(error);
        }
      );
    });
  }

  public async onCreateUser(): Promise<void> {
    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const createdBy = removeQuotes(getFromLocalStorage('userID'));

      let listFile = [];

      if (this.listFile.length > 0) {
        listFile = await this.uploadFile({ userID: createdBy }, this.listFile);
      }

      const payload = {
        servicePackName: this.data.servicePackName,
        price: this.data.price,
        content: this.data.content,
        promotion: this.data.promotion,
        expirationDate: this.data.expirationDate,
        image: listFile[0]?.filePath || this.data.image,
        createdBy: createdBy,
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdateUser(): Promise<void> {
    if (this.validInput()) {
      this.data = trimStringObject(this.data);

      const updatedBy = removeQuotes(getFromLocalStorage('userID'));

      let listFile = [];

      if (this.listFile.length > 0) {
        listFile = await this.uploadFile({ userID: updatedBy }, this.listFile);
      }

      const payload = {
        servicePackID: this.data.servicePackID,
        servicePackName: this.data.servicePackName,
        price: this.data.price,
        content: this.data.content,
        promotion: this.data.promotion,
        expirationDate: this.data.expirationDate,
        image: listFile[0]?.filePath || this.data.image,
        updatedBy: updatedBy,
      };

      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.service.createServicePack(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.listFile = [];
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
    this.service.updateServicePack(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.listFile = [];
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
