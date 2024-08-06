import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { EmployerService } from '../../employer.service';
import {
  getFromLocalStorage,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';

@Component({
  selector: 'app-employer-cart-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogCartComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  PRODUCT_STATUS = CONSTANT.PRODUCT_STATUS;

  selectStatus: any = {};

  constructor(
    private messageService: MessageService,
    private service: EmployerService
  ) {}

  ngOnInit() {}

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {}

  public async onUpdateProduct(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));

    this.data = trimStringObject(this.data);
    const payload = {
      productID: this.data.productID,
      servicePackID: this.data.servicePackID,
      status: this.PRODUCT_STATUS[1].CODE || this.data.status,
      updatedBy: updatedBy,
    };

    this.apiUpdate(payload);
  }

  apiUpdate(payload: any) {
    this.service.updateProduct(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
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
