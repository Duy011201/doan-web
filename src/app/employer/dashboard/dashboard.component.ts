import {Component} from '@angular/core';
import {SETTING} from "../../core/configs/setting.config";
import {getFromLocalStorage, isEmail, isEmpty, removeQuotes, trimStringObject} from "../../core/commons/func";
import {environment} from "../../core/environments/develop.environment";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmployerService} from "../employer.service";
import {LoadingService} from "../../core/services/loading.service";
import dayjs from "dayjs";

@Component({
  selector: 'app-employer-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {
  }

  statusRecruitment = {
    pending: 0,
    approved: 0,
    published: 0,
    expiring: 0,
    expired: 0,
  };
  listFile: any = [];
  listProduct: any = [];
  listRecruitment: any = [];
  visible: boolean = false;
  dataCompany: any = {};
  dataUser: any = {};
  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.apiGetByIDCompany();
    this.apiGetByIDUser();
    this.apiGetAllProduct();
    this.apiGetAllRecruitment();
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetByIDCompany();
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = {...data};

    this.dataDialog.headerDialog = 'Update company';
    this.dataDialog.subHeaderDialog = 'Update company information';

    this.dataDialog.actionDialog = action;
    this.visible = true;
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
    let listFile = [];

    if (this.listFile.length > 0) {
      listFile = await this.uploadFile(
        {companyID: this.dataCompany.companyID},
        this.listFile
      );
    }

    if (this.validInput()) {
      this.dataCompany = trimStringObject(this.dataCompany);
      const payload = {
        userID: this.dataUser.userID,
        companyID: this.dataUser?.companyID || '',
        username: this.dataUser.username || '',
        language: this.dataUser?.dataUser || '',
        education: this.dataUser?.education || '',
        certificate: this.dataUser.certificate || '',
        phone: this.dataUser.phone || '',
        avatar: listFile[0]?.filePath || this.dataUser.avatar || '',
        profile: this.dataUser.profile || '',
        email: this.dataUser.email,
        roleID: this.dataUser.roleID,
        status: this.dataUser.status,
        updatedBy: updatedBy,
      };

      this.apiUpdateUser(payload);
    }
  }

  apiUpdateUser(payload: any) {
    this.loadingService.show();
    this.service.updateUser(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.apiGetByIDUser();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.listFile = [];
          }, 500);
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

  apiGetByIDCompany() {
    this.loadingService.show();
    this.service.getByIDCompany({companyID: removeQuotes(getFromLocalStorage('companyID'))}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.dataCompany = result.data[0];
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

  apiGetAllProduct() {
    this.loadingService.show();
    this.service.getAllProduct({
      userID: removeQuotes(getFromLocalStorage('userID')),
      status: this.PRODUCT_STATUS.PAID
    }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listProduct = result.data;
            this.listProduct = result.data.filter((item: any) => {
              if (item.totalExpiration > 0) {
                let updatedAtDate = dayjs(item.updatedAt);
                let differenceInDays = dayjs().diff(updatedAtDate, 'day');
                item.totalExpiration -= differenceInDays;
                if (item.totalExpiration < 0) {
                  item.totalExpiration = 0;
                }
              }
              return item;
            });
            this.loadingService.hide();
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

  apiGetAllRecruitment() {
    this.loadingService.show();
    this.service.getAllRecruitment({
      userID: removeQuotes(getFromLocalStorage('userID')),
    }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listRecruitment = result.data;
            const today = dayjs();
            const sevenDaysFromNow = dayjs().add(7, 'day');

            this.listRecruitment.forEach((item: any) => {
              if (item.status === "PENDING") {
                this.statusRecruitment.pending++;
              } else if (item.status === "APPROVED") {
                this.statusRecruitment.approved++;
              } else if (item.status === "PUBLISHED") {
                this.statusRecruitment.published++;
              }

              const timeEndDate = dayjs(item.timeEnd);
              if (timeEndDate.isAfter(today) && timeEndDate.isBefore(sevenDaysFromNow)) {
                this.statusRecruitment.expiring++;
              }

              if (dayjs(item.timeEnd).isBefore(today)) {
                this.statusRecruitment.expired++;
              }
            });
            this.loadingService.hide();
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
