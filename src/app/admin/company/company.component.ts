import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { AdminService } from '../admin.service';
import { environment } from '../../core/environments/develop.environment';
import { CONSTANT } from '../../core/configs/constant.config';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-admin-company',
  standalone: false,
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_PROVINCE = CONSTANT.COMPANY_PROVINCE;
  LIST_SYSTEM_STATUS = CONSTANT.SYSTEM_STATUS;
  LIST_FIELD = CONSTANT.COMPANY_FIELD;

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

  listCompany: any = [];
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
        this.dataDialog.headerDialog = 'View company';
        this.dataDialog.subHeaderDialog = 'View company information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create company';
        this.dataDialog.subHeaderDialog = 'Create company information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update company';
        this.dataDialog.subHeaderDialog = 'Update company information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, company: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this company?',
      header: 'Delete Company',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.apiDelete(company);
      },
      reject: () => {},
    });
  }

  confirmLock(event: Event, company: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want lock company?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.apiLock(company);
      },
      reject: () => {},
    });
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll();
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  apiLock(company: any) {
    this.service.lockCompany({ companyID: company.companyID }).subscribe(
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

  apiDelete(company: any) {
    this.service.deleteCompany({ companyID: company.companyID }).subscribe(
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
    this.service.getAllCompany({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listCompany = result.data;
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
