import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EmployerService} from '../../employer/employer.service';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {LoadingService} from '../../core/services/loading.service';
import {SharedModule} from '../../share/share.module';
import {CONSTANT} from "../../core/configs/constant.config";
import * as _ from 'lodash';
import {getFromLocalStorage, isEmpty, removeQuotes} from "../../core/commons/func";
import dayjs from "dayjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employer-search-company-detail',
  standalone: true,
  imports: [SharedModule],
  providers: [EmployerService, MessageService, LoadingService],
  templateUrl: './search-recruitment-detail.component.html',
  styleUrl: './search-recruitment-detail.component.scss',
})
export class SearchRecruitmentDetailComponent implements OnInit {
  dataRecruitment: any = {};
  isTop: boolean = false;
  loading: boolean = true;
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  LIST_PROVINCE = CONSTANT.COMPANY_PROVINCE;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  RECRUITMENT_STATUS = SETTING.RECRUITMENT;
  LIST_FIELD = CONSTANT.COMPANY_FIELD;
  payload: any = {
    recruitmentID: '',
  };
  isRole = '';
  isLink = ''

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
  ) {
    const role = getFromLocalStorage('role');
    this.isRole = role ? removeQuotes(role) : '';
    this.isLink = `${this.pathEnvironment}/${this.route.snapshot.url.map(segment => segment.path).join('/')}`
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.payload.recruitmentID = params['id']
      this.payload.status = this.RECRUITMENT_STATUS.PUBLISHED
      this.apiGetAllRecruitment(this.payload);
    });
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  apiGetAllRecruitment(payload: any) {
    this.loadingService.show();
    this.service.getAllRecruitmentHeader(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.dataRecruitment = result.data[0];
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

  createRecruitmentProcess(item: any) {

    let errMsg = '';

    if (isEmpty(this.isRole)) {
      errMsg = 'Bạn cần đăng nhập để thực hiện chức năng này.'
    } else if (this.isRole !== this.SYSTEM_ROLE.CANDIDATE) {
      errMsg = 'Bạn không phải là ứng viên.'
    }

    if (!isEmpty(errMsg)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: errMsg,
      });
      return;
    }

    let payload = {
      recruitmentID: item.recruitmentID,
      candidateID: removeQuotes(getFromLocalStorage('userID')),
      createdBy: removeQuotes(getFromLocalStorage('userID')),
    }

    this.loadingService.show();
    this.service.createRecruitmentProcess(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.loadingService.hide();
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
