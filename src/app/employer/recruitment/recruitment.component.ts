import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { EmployerService } from '../employer.service';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { CONSTANT } from '../../core/configs/constant.config';
import dayjs from 'dayjs';
import { LoadingService } from '../../core/services/loading.service';
import * as _ from "lodash";

@Component({
  selector: 'app-employer-recruitment',
  standalone: false,
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.scss',
})
export class RecruitmentComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_RECRUITMENT_STATUS = CONSTANT.RECRUITMENT;
  RECRUITMENT_STATUS = SETTING.RECRUITMENT;

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {}

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };

  selectedStatusRecruitment: any = {
    CODE: '',
    NAME: '',
  };
  listRecruitment: any = [];
  loading: boolean = true;
  visible: boolean = false;
  currentDate = dayjs();
  pathEnvironment = environment.API_URL;
  payload: any = {
    userID: removeQuotes(getFromLocalStorage('userID'))
  };

  ngOnInit() {
    this.apiGetAll(this.payload);
  }

  clear(table: Table) {
    this.selectedStatusRecruitment = { CODE: '', NAME: '' };
    this.apiGetAll(this.payload);
    table.clear();
  }

  onSearch() {
    let payload = _.clone(this.payload);
    payload.status = this.selectedStatusRecruitment.CODE;
    this.apiGetAll(payload)
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll(this.payload);
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = { ...data };

    switch (action) {
      case this.SYSTEM_ACTION.VIEW:
        this.dataDialog.headerDialog = 'View recruitment';
        this.dataDialog.subHeaderDialog = 'View recruitment information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create recruitment';
        this.dataDialog.subHeaderDialog = 'Create recruitment information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update recruitment';
        this.dataDialog.subHeaderDialog = 'Update recruitment information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
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
      reject: () => {},
    });
  }

  apiDelete(item: any) {
    this.service
      .deleteRecruitment({ recruitmentID: item.recruitmentID })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetAll(this.payload);
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

  apiStatus(item: any, status: string) {
    this.service
      .statusRecruitment({
        recruitmentID: item.recruitmentID,
        status: status,
        updatedBy: removeQuotes(getFromLocalStorage('userID')),
      })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetAll(this.payload);
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

  apiGetAll(payload: any) {
    this.loadingService.show();
    this.service.getAllRecruitment(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listRecruitment = result.data;
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
}
