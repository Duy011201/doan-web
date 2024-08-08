import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {CandidateService} from '../candidate.service';
import {getFromLocalStorage, removeQuotes} from '../../core/commons/func';
import dayjs from 'dayjs';
import {LoadingService} from '../../core/services/loading.service';
import * as _ from "lodash";
import {CONSTANT} from "../../core/configs/constant.config";

@Component({
  selector: 'app-employer-recruitment-process',
  standalone: false,
  templateUrl: './recruitment-process.component.html',
  styleUrls: ['./recruitment-process.component.scss']
})
export class RecruitmentProcessComponent implements OnInit {
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_COMPANY_FIELD = CONSTANT.COMPANY_FIELD
  LIST_COMPANY_PROVINCE = CONSTANT.COMPANY_PROVINCE

  constructor(
    private messageService: MessageService,
    private service: CandidateService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {
  }

  selectedRecruitment: any = {
    recruitmentID: ''
  };
  listRecruitmentProcess: any = [];
  loading: boolean = true;
  currentDate = dayjs();
  pathEnvironment = environment.API_URL;
  payload: any = {
    candidateID: removeQuotes(getFromLocalStorage('userID'))
  };

  ngOnInit() {
    this.apiGetRecruitmentProcessAll(this.payload);
  }

  clear(table: Table) {
    this.selectedRecruitment = {recruitmentID: ''};
    this.apiGetRecruitmentProcessAll(this.payload);
    table.clear();
  }

  onSearch() {
    let payload = _.clone(this.payload);
    payload.recruitmentID = this.selectedRecruitment.recruitmentID;
    this.apiGetRecruitmentProcessAll(payload)
  }

  onSave() {
    let payload = _.clone(this.payload);
    payload.saveProfile = 'true';
    this.apiGetRecruitmentProcessAll(payload)
  }

  confirmDelete(event: Event, item: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete recruitment',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.apiDelete(item);
      },
      reject: () => {
      },
    });
  }

  apiDelete(item: any) {
    this.service
      .deleteRecruitmentProcess({recruitmentProcessID: item.recruitmentProcessID})
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetRecruitmentProcessAll(this.payload);
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

  apiSaveProfile(status: string, recruitmentProcessID: string) {
    this.service
      .saveProfileRecruitmentProcess({saveProfile: status,recruitmentProcessID: recruitmentProcessID })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetRecruitmentProcessAll(this.payload);
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

  apiGetRecruitmentProcessAll(payload: any) {
    this.loadingService.show();
    this.service.getRecruitmentProcessCandidate(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listRecruitmentProcess = result.data;
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

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }
}
