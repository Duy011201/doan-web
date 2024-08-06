import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { AdminService } from '../admin.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-admin-service-pack',
  standalone: false,
  templateUrl: './service-pack.component.html',
  styleUrl: './service-pack.component.scss',
})
export class ServicePackComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

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

  listServicePack: any = [];
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
        this.dataDialog.headerDialog = 'View service pack';
        this.dataDialog.subHeaderDialog = 'View service pack information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create service pack';
        this.dataDialog.subHeaderDialog = 'Create service pack information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update service pack';
        this.dataDialog.subHeaderDialog = 'Update service pack information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, company: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
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

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll();
  }

  apiDelete(servicePack: any) {
    this.service
      .deleteServicePack({ servicePackID: servicePack.servicePackID })
      .subscribe(
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
    this.service.getAllServicePack({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listServicePack = result.data;
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
