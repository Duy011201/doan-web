import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {SETTING} from '../../../core/configs/setting.config';
import {CONSTANT} from '../../../core/configs/constant.config';
import {EmployerService} from '../../employer.service';
import {getFromLocalStorage, isEmpty, removeQuotes, trimStringObject,} from '../../../core/commons/func';
import {environment} from '../../../core/environments/develop.environment';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-employer-recruitment-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogRecruitmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_RECRUITMENT: any = CONSTANT.RECRUITMENT;
  LIST_PROVINCE: any = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD: any = CONSTANT.COMPANY_FIELD;
  LIST_TIME_FORM: any = CONSTANT.TIME_FORM;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  selectProvince: any = {};
  selectField: any = {};
  selectStatus: any = {};
  selectTimeForm: any = {};

  currentDate = new Date();
  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private service: EmployerService
  ) {
  }

  ngOnInit() {
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.selectStatus = this.LIST_RECRUITMENT.find(
      (item: any) => item.CODE === this.data.status
    );
    this.selectProvince = this.LIST_PROVINCE.find(
      (item: any) => item.CODE === this.data.province
    );
    this.selectField = this.LIST_FIELD.find(
      (item: any) => item.CODE === this.data.field
    );
    this.selectTimeForm = this.LIST_TIME_FORM.find(
      (item: any) => item.CODE === this.data.timeForm
    );

    if (this.data.actionDialog === this.SYSTEM_ACTION.CREATE) {
      this.data.timeStart = dayjs(this.currentDate).toDate();
    }

    if (this.data) {
      if (this.data.timeStart) {
        this.data.timeStart = dayjs(this.data.timeStart).toDate();
      }

      if (this.data.timeEnd) {
        this.data.timeEnd = dayjs(this.data.timeEnd).toDate();
      }
    }
  }

  onChangeTitle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let title = inputElement.value;
    this.data.keyword = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, '-');
  }

  private validInput(): boolean {
    let errorMessage = '';

    if (this.data.timeStart) {
      this.data.timeStart = dayjs(this.data.timeStart).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')
    }

    if (this.data.timeEnd) {
      this.data.timeEnd = dayjs(this.data.timeEnd).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')
    }

    if (isEmpty(this.data.title)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_TITLE_FORMAT;
    } else if (isEmpty(this.data.keyword)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_KEYWORD_FORMAT;
    } else if (isEmpty(this.data.description)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_DESCRIPTION_FORMAT;
    } else if (isEmpty(this.data.address)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_ADDRESS_FORMAT;
    } else if (isEmpty(this.data.required)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_REQUIRED_FORMAT;
    } else if (isEmpty(this.selectProvince)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_PROVINCE_FORMAT;
    } else if (isEmpty(this.selectField)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_FIELD_FORMAT;
    } else if (isEmpty(this.selectTimeForm)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_TIME_FORM_FORMAT;
    } else if (isEmpty(this.data.timeStart)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_TIME_START;
    } else if (isEmpty(this.data.timeEnd)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_TIME_END;
    } else if (isEmpty(this.data.salaryFrom)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SALARY_FROM_FORMAT;
    } else if (isEmpty(this.data.salaryTo)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SALARY_TO_FORMAT;
    } else if (this.data.salaryFrom > this.data.salaryTo) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_SALARY_TO_FORMAT;
    }

    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return false;
    }

    return true;
  }

  public async onCreate(): Promise<void> {
    const createdBy = removeQuotes(getFromLocalStorage('userID'));

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        userID: removeQuotes(getFromLocalStorage('userID')),
        keyword: this.data.keyword,
        title: this.data.title,
        address: this.data.address,
        description: this.data.description,
        required: this.data.required,
        province: this.selectProvince?.CODE || this.data.province,
        field: this.selectField?.CODE || this.data.field,
        timeForm: this.selectTimeForm?.CODE || this.data.timeForm,
        timeStart: this.data.timeStart,
        timeEnd: this.data.timeEnd,
        salaryFrom: this.data.salaryFrom,
        salaryTo: this.data.salaryTo,
        createdBy: createdBy,
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdate(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        recruitmentID: this.data.recruitmentID,
        userID: removeQuotes(getFromLocalStorage('userID')),
        keyword: this.data.keyword,
        title: this.data.title,
        address: this.data.address,
        description: this.data.description,
        required: this.data.required,
        province: this.selectProvince?.CODE || this.data.province,
        field: this.selectField?.CODE || this.data.field,
        status: this.selectStatus?.CODE || this.data.status,
        timeForm: this.selectTimeForm?.CODE || this.data.timeForm,
        timeStart: this.data.timeStart,
        timeEnd: this.data.timeEnd,
        salaryFrom: this.data.salaryFrom,
        salaryTo: this.data.salaryTo,
        updatedBy: updatedBy,
      };
      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.service.createRecruitment(payload).subscribe(
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

  apiUpdate(payload: any) {
    this.service.updateRecruitment(payload).subscribe(
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
