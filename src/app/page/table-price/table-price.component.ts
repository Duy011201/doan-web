import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../../admin/admin.service';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { removeQuotes, getFromLocalStorage, isEmpty } from '../../core/commons/func';
import { SharedModule } from '../../share/share.module';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-table-price',
  standalone: true,
  imports: [SharedModule],
  providers: [AdminService, MessageService, ConfirmationService],
  templateUrl: './table-price.component.html',
  styleUrl: './table-price.component.scss',
})
export class TablePriceComponent implements OnInit {
  listService: any = [];
  pathEnvironment = environment.API_URL;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  isRole = '';
  isLogin = '';

  constructor(
    private messageService: MessageService,
    private service: AdminService
  ) {
    const role = getFromLocalStorage('role');
    this.isRole = role ? removeQuotes(role) : '';

    const token = getFromLocalStorage('token');
    this.isLogin = token ? removeQuotes(token) : '';
  }

  ngOnInit(): void {
    this.apiGetAll();
  }

  public async onCreateProduct(service: any): Promise<void> {
    let errMsg = '';

    if (isEmpty(this.isRole)) {
      errMsg = 'Bạn cần đăng nhập để thực hiện chức năng này.'
    } else if (this.isRole !== this.SYSTEM_ROLE.EMPLOYER) {
      errMsg = 'Bạn không phải là nhà tuyển dụng.'
    }

    if (!isEmpty(errMsg)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: errMsg,
      });
      return;
    }

    const createdBy = removeQuotes(getFromLocalStorage('userID'));
    const payload = {
      userID: createdBy,
      servicePackID: service.servicePackID,
      createdBy: createdBy,
    };
    this.service.createProduct(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Thêm vào giỏ hàng thành công',
          });
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
    this.service.getAllServicePack({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listService = result.data;
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
