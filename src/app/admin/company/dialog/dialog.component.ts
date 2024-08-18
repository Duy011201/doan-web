import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { AdminService } from '../../admin.service';
import {
  getFromLocalStorage,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';

@Component({
  selector: 'app-admin-company-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogCompanyComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_PROVINCE: any = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD: any = CONSTANT.COMPANY_FIELD;
  LIST_SCALE: any = CONSTANT.COMPANY_SCALE;
  LIST_STATUS: any = CONSTANT.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  selectScale: any = {};
  selectProvince: any = {};
  selectField: any = {};
  selectStatus: any = {};
  listFile: any = [];

  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private service: AdminService
  ) {}

  ngOnInit() {
    // Default remove inactive
    this.LIST_STATUS = this.LIST_STATUS.filter(
      (item: any) => item.CODE !== 'IN_ACTIVE'
    );
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.selectStatus = this.LIST_STATUS.find(
      (item: any) => item.CODE === this.data.status
    );
    this.selectProvince = this.LIST_PROVINCE.find(
      (item: any) => item.CODE === this.data.province
    );
    this.selectField = this.LIST_FIELD.find(
      (item: any) => item.CODE === this.data.field
    );
    this.selectScale = this.LIST_SCALE.find(
      (item: any) => item.CODE === this.data.scale
    );
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

  private validInput(): boolean {
    let errorMessage = '';

    if (isEmpty(this.data.name)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_COMPANY_NAME_FORMAT;
    } else if (isEmpty(this.selectStatus)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_STATUS;
    } else if (isEmpty(this.data.corporateTaxCode)) {
      errorMessage =
        SETTING.SYSTEM_HTTP_MESSAGE.INVALID_COMPANY_CORPORATE_TAX_CODE;
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
    const createdBy = removeQuotes(getFromLocalStorage('userID'));

    let listFile = [];

    if (this.listFile.length > 0) {
      listFile = await this.uploadFile({ userID: createdBy }, this.listFile);
    }

    if (this.validInput()) {
      this.data = trimStringObject(this.data);

      const payload = {
        name: this.data.name || '',
        introduce: this.data.introduce || '',
        email: this.data.email || '',
        phone: this.data.phone || '',
        province: this.selectProvince?.CODE || '',
        address: this.data.address || '',
        field: this.selectField?.CODE || '',
        logo: listFile[0]?.filePath || this.data.logo || '',
        scale: this.selectScale?.CODE || 0,
        corporateTaxCode: this.data.corporateTaxCode || '',
        website: this.data.website || '',
        status: this.selectStatus.CODE || this.data.status,
        createdBy: createdBy,
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdateUser(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));
    let listFile = [];

    if (this.listFile.length > 0) {
      listFile = await this.uploadFile(
        { companyID: this.data.companyID },
        this.listFile
      );
    }

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        companyID: this.data.companyID,
        name: this.data.name || '',
        introduce: this.data.introduce || '',
        email: this.data.email || '',
        phone: this.data.phone || '',
        province: this.selectProvince?.CODE || '',
        address: this.data.address || '',
        field: this.selectField?.CODE || '',
        logo: listFile[0]?.filePath || this.data.logo || '',
        scale: this.selectScale?.CODE || 0,
        corporateTaxCode: this.data.corporateTaxCode || '',
        website: this.data.website || '',
        status: this.selectStatus.CODE || this.data.status,
        updatedBy: updatedBy,
      };

      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.service.createCompany(payload).subscribe(
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
    this.service.updateCompany(payload).subscribe(
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
