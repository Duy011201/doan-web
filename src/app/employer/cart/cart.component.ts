import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { CONSTANT } from '../../core/configs/constant.config';
import { environment } from '../../core/environments/develop.environment';
import { EmployerService } from '../employer.service';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { LoadingService } from '../../core/services/loading.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-employer-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_PRODUCT_STATUS = CONSTANT.PRODUCT_STATUS;

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {}

  listProduct: any = [];
  loading: boolean = true;
  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  visible: boolean = false;
  pathEnvironment = environment.API_URL;
  selectedStatusProduct: any = {
    CODE: '',
    NAME: '',
  };

  ngOnInit() {
    this.apiGetAll({});
  }

  clear(table: Table) {
    table.clear();
    this.apiGetAll({});
    this.selectedStatusProduct = {
      CODE: '',
      NAME: '',
    };
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  confirmDelete(event: Event, blog: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product from cart?',
      header: 'Delete product',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.apiDelete(blog);
      },
      reject: () => {},
    });
  }

  apiDelete(product: any) {
    this.service.deleteProduct({ productID: product.productID }).subscribe(
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
    payload.userID = removeQuotes(getFromLocalStorage('userID'));
    this.loadingService.show();
    this.service.getAllProduct(payload).subscribe(
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

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll({});
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = { ...data };
    this.dataDialog.headerDialog = 'Payment';
    this.dataDialog.subHeaderDialog = 'View payment information';
    this.dataDialog.actionDialog = action;
    this.visible = true;
  }
}
