import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { CONSTANT } from '../../core/configs/constant.config';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { PageService } from '../page.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_PRODUCT_STATUS = CONSTANT.PRODUCT_STATUS;

  constructor(
    private messageService: MessageService,
    private service: PageService,
    private confirmationService: ConfirmationService
  ) {}

  listProduct: any = [];
  loading: boolean = true;
  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  selectedStatusProduct: any = {
    CODE: '',
    NAME: '',
  };
  currentDate = dayjs();
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.LIST_PRODUCT_STATUS = this.LIST_PRODUCT_STATUS.filter(
      (item) => item.CODE !== this.PRODUCT_STATUS.DRAFT
    );
    this.apiGetAll({});
  }

  clear(table: Table) {
    table.clear();
  }

  apiGetAll(payload: any) {
    payload.userID = removeQuotes(getFromLocalStorage('userID'));
    this.service.getAllProduct(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listProduct = result.data;
          this.listProduct = result.data.filter((item: any) => {
            if (item.totalExpiration > 0) {
              let updatedAtDate = dayjs(item.updatedAt);
              let differenceInDays = dayjs().diff(updatedAtDate, 'day');
              item.totalExpiration -= differenceInDays;
            }
            return item.status !== this.PRODUCT_STATUS.DRAFT;
          });
          this.loading = false;
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

  confirmDelete(event: Event, blog: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product from order?',
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
}
