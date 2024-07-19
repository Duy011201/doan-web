import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageService } from '../page.service';
import { SETTING } from '../../core/configs/setting.config';
import { RequestApiService } from '../../core/services/request-api.service';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { PrimengModule } from '../../core/modules/primeng.module';
import { environment } from '../../core/environments/develop.environment';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';

@Component({
  selector: 'app-table-price',
  standalone: true,
  imports: [PrimengModule, FormsModule, ToastModule, MessagesModule],
  providers: [
    PageService,
    MessageService,
    ConfirmationService,
    RequestApiService,
  ],
  templateUrl: './table-price.component.html',
  styleUrl: './table-price.component.scss',
})
export class TablePriceComponent implements OnInit {
  listService: any = [];
  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private service: PageService
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
