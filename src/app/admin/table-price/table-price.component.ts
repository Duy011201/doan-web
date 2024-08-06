import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../admin.service';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import { SharedModule } from '../../share/share.module';

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

  constructor(
    private messageService: MessageService,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.apiGetAll();
  }

  public async onCreateProduct(service: any): Promise<void> {
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
