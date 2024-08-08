import { Component } from '@angular/core';
import {CONSTANT} from "../../core/configs/constant.config";
import {SETTING} from "../../core/configs/setting.config";
import {environment} from "../../core/environments/develop.environment";
import {MessageService} from "primeng/api";
import {CandidateService} from "../candidate.service";
import {getFromLocalStorage, isEmail, isEmpty, removeQuotes, trimStringObject} from "../../core/commons/func";
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-employer-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  LIST_EDUCATION: any = CONSTANT.EDUCATION;
  LIST_LANGUAGES: any = CONSTANT.LANGUAGES;
  LIST_STATUS: any = CONSTANT.SYSTEM_STATUS;
  LIST_ROLE: any = CONSTANT.SYSTEM_ROLE;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  SYSTEM_ROLE: any = SETTING.SYSTEM_ROLE;

  selectEducation: any = {};
  selectLanguage: any = {};
  selectRole: any = {};
  selectStatus: any = {};
  selectCompany: any = {};

  listFileImage: any = [];
  listFileProfile: any = [];
  listRole: any = [];
  dataUser: any = {};

  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private service: CandidateService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.apiGetByIDUser();
  }

  ngOnChanges() {
  }

  onFileSelected(event: any, type: string) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if(type === 'image') this.listFileImage.push(event.target.files[i]);
        if(type === 'profile') this.listFileProfile.push(event.target.files[i]);
      }
    }
  }

  private uploadFile(payload: any, files: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.service.upload(payload, files).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.listFileImage = [];
            this.listFileProfile = [];
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

    if (!isEmail(this.dataUser.email)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_EMAIL_FORMAT;
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

  public async onUpdateUser(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));

    let fileImage = [];
    let fileProfile = [];
    if (this.listFileImage.length > 0) {
      fileImage = await this.uploadFile({ userID: updatedBy }, this.listFileImage);
    }

    if (this.listFileProfile.length > 0) {
      fileProfile = await this.uploadFile({ userID: updatedBy }, this.listFileProfile);
    }

    if (this.validInput()) {
      this.dataUser = trimStringObject(this.dataUser);
      const payload = {
        userID: this.dataUser.userID,
        companyID: this.selectCompany?.companyID || '',
        username: this.dataUser.username || '',
        language: this.selectLanguage?.CODE || '',
        education: this.selectEducation?.CODE || '',
        certificate: this.dataUser.certificate || '',
        phone: this.dataUser.phone || '',
        avatar: fileImage[0]?.filePath || this.dataUser.avatar || '',
        profile: fileProfile[0]?.filePath || this.dataUser.profile || '',
        email: this.dataUser.email,
        roleID: this.dataUser.roleID,
        status: this.dataUser.status,
        updatedBy: updatedBy,
      };
      this.apiUpdate(payload);
    }
  }

  apiUpdate(payload: any) {
    this.loadingService.show();
    this.service.updateUser(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
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

  apiGetByIDUser() {
    this.loadingService.show();
    this.service.getByIDUser({userID: removeQuotes(getFromLocalStorage('userID'))}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.dataUser = result.data[0];

            this.selectEducation = this.LIST_EDUCATION.find(
              (item: any) => item.CODE === this.dataUser.education
            );
            this.selectLanguage = this.LIST_LANGUAGES.find(
              (item: any) => item.CODE === this.dataUser.language
            );
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
