import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {EmployerService} from '../employer.service';
import {getFromLocalStorage, removeQuotes} from '../../core/commons/func';
import dayjs from 'dayjs';
import {LoadingService} from '../../core/services/loading.service';
import * as _ from "lodash";

@Component({
  selector: 'app-employer-recruitment-process',
  standalone: false,
  templateUrl: './recruitment-process.component.html',
  styleUrls: ['./recruitment-process.component.scss']
})
export class RecruitmentProcessComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  STATUS_RECRUITMENT = SETTING.RECRUITMENT

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {
  }

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };

  selectedRecruitment: any = {
    recruitmentID: ''
  };
  listRecruitment: any = [];
  listRecruitmentProcess: any = [];
  loading: boolean = true;
  visible: boolean = false;
  currentDate = dayjs();
  pathEnvironment = environment.API_URL;
  payload: any = {
    userID: removeQuotes(getFromLocalStorage('userID'))
  };

  ngOnInit() {
    this.apiGetRecruitmentProcessAll(this.payload);
    this.apiGetRecruitmentAll({userID: removeQuotes(getFromLocalStorage('userID')),
      status: this.STATUS_RECRUITMENT.PUBLISHED});
  }

  clear(table: Table) {
    this.selectedRecruitment = {recruitmentID: ''};
    this.apiGetRecruitmentProcessAll(this.payload);
    table.clear();
  }

  onSearch() {
    let payload = _.clone(this.payload);
    payload.recruitmentID = this.selectedRecruitment.recruitmentID;
    this.apiGetRecruitmentProcessAll(payload)
  }

  onSave() {
    let payload = _.clone(this.payload);
    payload.saveProfile = 'true';
    this.apiGetRecruitmentProcessAll(payload)
  }

  confirmDelete(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete recruitment',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.apiDelete(item);
      },
      reject: () => {
      },
    });
  }

  apiDelete(item: any) {
    this.service
      .deleteRecruitmentProcess({recruitmentProcessID: item.recruitmentProcessID})
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetRecruitmentProcessAll(this.payload);
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

  apiSaveProfile(status: string, recruitmentProcessID: string) {
    this.service
      .saveProfileRecruitmentProcess({saveProfile: status,recruitmentProcessID: recruitmentProcessID })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetRecruitmentProcessAll(this.payload);
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

  apiGetRecruitmentProcessAll(payload: any) {
    this.loadingService.show();
    this.service.getRecruitmentProcessEmployer(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listRecruitmentProcess = result.data;
            this.loadingService.hide();
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

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  apiGetFile(payload: any) {
    this.loadingService.show();
    this.service.getFile(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          const filePDF = result.data;
          this.downloadBase64File(filePDF[0].fileBase64, filePDF[0].fileName, filePDF[0].fileType);
          this.loadingService.hide();
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

  apiGetRecruitmentAll(payload: any) {
    this.loadingService.show();
    this.service.getAllRecruitment(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listRecruitment = result.data;
          this.loadingService.hide();
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

  downloadBase64File(base64Data: string, fileName: string, fileType: string) {
    const linkSource = `data:${fileType};base64,${base64Data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
