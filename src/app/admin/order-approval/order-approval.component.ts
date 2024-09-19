import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { AdminService } from '../admin.service';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { CONSTANT } from '../../core/configs/constant.config';
import dayjs from 'dayjs';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-admin-order-approval',
  standalone: false,
  templateUrl: './order-approval.component.html',
  styleUrl: './order-approval.component.scss',
})
export class OrderApprovalComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_PRODUCT_STATUS = CONSTANT.PRODUCT_STATUS;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;

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

  selectedStatusProduct: any = {
    CODE: '',
    NAME: '',
  };
  listProduct: any = [];
  loading: boolean = true;
  currentDate = dayjs();
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.apiGetAll({});
  }

  clear(table: Table) {
    this.selectedStatusProduct = { CODE: '', NAME: '' };
    this.apiGetAll({});
    table.clear();
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

  apiDelete(item: any) {
    this.service.deleteProduct({ productID: item.productID }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll({});
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

  apiUpdate(product: any, status: string) {
    this.service
      .updateProduct({
        productID: product.productID,
        status: status,
        servicePackID: product.servicePackID,
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
            this.apiGetAll({});
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
    this.service.getAllProduct(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listProduct = result.data;
            this.listProduct = this.listProduct.map((item: any) => {
              if (item.totalExpiration > 0) {
                let updatedAtDate = dayjs(item.updatedAt);
                let differenceInDays = this.currentDate.diff(
                  updatedAtDate,
                  'day'
                );
                item.totalExpiration -= differenceInDays;
                if (item.totalExpiration < 0) {
                  item.totalExpiration = 0;
                }
              }
              return item;
            });
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
}
