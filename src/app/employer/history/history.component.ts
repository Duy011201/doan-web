import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { CONSTANT } from '../../core/configs/constant.config';
import { environment } from '../../core/environments/develop.environment';
import { EmployerService } from '../employer.service';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-employer-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  PRODUCT_STATUS = CONSTANT.PRODUCT_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

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

  ngOnInit() {
    this.apiGetAll();
  }

  clear(table: Table) {
    table.clear();
  }

  apiGetAll() {
    this.loadingService.show();
    this.service
      .getAllHistory({
        userID: removeQuotes(getFromLocalStorage('userID')),
      })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            setTimeout(() => {
              this.loadingService.hide();
              this.listProduct = result.data;
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
