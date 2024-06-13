import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {SETTING} from "../../../core/configs/setting.config";
import {CONSTANT} from "../../../core/configs/constant.config";
import {AdminService} from "../../admin.service";
import {getFromLocalStorage, isEmail, isEmpty, removeQuotes, trimStringObject} from "../../../core/commons/func";
import {environment} from "../../../core/environments/develop.environment";

@Component({
  selector: 'app-admin-user-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogUserComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_EDUCATION: any = CONSTANT.EDUCATION;
  LIST_LANGUAGES: any = CONSTANT.LANGUAGES;
  LIST_STATUS: any = CONSTANT.SYSTEM_STATUS;
  LIST_ROLE: any = CONSTANT.SYSTEM_ROLE;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  selectEducation: any = {};
  selectLanguage: any = {};
  selectRole: any = {};
  selectStatus: any = {};
  selectCompany: any = {};

  listCompany: any = [];
  listRole: any = [];
  listFile: any = [];

  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    // Default remove inactive
    this.LIST_STATUS = this.LIST_STATUS.filter((item: any) => item.CODE !== 'IN_ACTIVE');

    this.apiGetAllRole();
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.selectStatus = this.LIST_STATUS.find((item: any) => item.NAME === this.data.status);
    this.selectEducation = this.LIST_EDUCATION.find((item: any) => item.NAME === this.data.education);
    this.selectLanguage = this.LIST_LANGUAGES.find((item: any) => item.NAME === this.data.language);
    this.selectRole = this.listRole.find((item: any) => item.name === this.data.role);
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
      this.adminService.upload(payload, files).subscribe(
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

    if (!isEmail(this.data.email)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
    } else if (isEmpty(this.selectRole)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_ROLE;
    } else if (isEmpty(this.selectStatus)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_STATUS;
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
    const token = removeQuotes(getFromLocalStorage('token'));

    let listFile = [];

    if (this.listFile.length > 0) {
      listFile = await this.uploadFile({userID: createdBy}, this.listFile);
      console.log(listFile[0])
    }

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        username: this.data.username || '',
        language: this.selectLanguage?.NAME || '',
        education: this.selectEducation?.NAME || '',
        certificate: this.data.certificate || '',
        phone: this.data.phone || '',
        avatar: listFile[0].filePath || this.data.avatar || '',
        email: this.data.email,
        role: this.selectRole.NAME,
        createdBy: createdBy,
        token: token
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdateUser(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));
    const token = removeQuotes(getFromLocalStorage('token'));
    let listFile = [];

    if (this.listFile.length > 0) {
      listFile = await this.uploadFile({userID: updatedBy}, this.listFile);
      console.log(listFile[0])
    }

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        userID: this.data.userID,
        username: this.data.username || '',
        language: this.selectLanguage?.NAME || '',
        education: this.selectEducation?.NAME || '',
        certificate: this.data.certificate || '',
        phone: this.data.phone || '',
        avatar: listFile[0].filePath || this.data.avatar || '',
        email: this.data.email,
        roleID: this.selectRole.roleID || this.data.roleID,
        status: this.selectStatus.NAME || this.data.status,
        updatedBy: updatedBy,
        token: token
      };
      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.adminService.createUser(payload).subscribe(
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
    this.adminService.updateUser(payload).subscribe(
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

  apiGetAllRole() {
    this.adminService.getAllRole({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listRole = result.data;
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
