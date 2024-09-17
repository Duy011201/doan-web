import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EmployerService} from '../../employer/employer.service';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {LoadingService} from '../../core/services/loading.service';
import {SharedModule} from '../../share/share.module';
import {CONSTANT} from "../../core/configs/constant.config";
import * as _ from 'lodash';
import {getFromLocalStorage, removeQuotes} from "../../core/commons/func";
import dayjs from "dayjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employer-search-company-detail',
  standalone: true,
  imports: [SharedModule],
  providers: [EmployerService, MessageService, LoadingService],
  templateUrl: './search-company-detail.component.html',
  styleUrl: './search-company-detail.component.scss',
})
export class SearchCompanyDetailComponent implements OnInit {
  dataCompany: any = {};
  listProduct: any = [];
  isTop: boolean = false;
  loading: boolean = true;
  listRecruitment: any = [];
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  LIST_PROVINCE = CONSTANT.COMPANY_PROVINCE;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  RECRUITMENT_STATUS = SETTING.RECRUITMENT;
  SERVICE_PACK = SETTING.SERVICE_PACK
  payload: any = {
    companyID: '',
    province: '',
  };
  selectedProvince = {CODE: '', NAME: ''}
  selectedField = {CODE: '', NAME: ''}
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
    this.apiGetAllProduct();
    this.route.params.subscribe((params) => {
      this.apiGetByID({ companyID: params['id'] });
      this.payload.companyID = params['id']
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

  onSearch() {
    if (this.payload.keyword) {
      this.payload.keyword = this.payload.keyword
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-');
    }

    this.payload.province = this.selectedProvince ? this.selectedProvince.CODE : '';
    this.apiGetAllRecruitment(this.payload);
  }

  apiGetByID(payload: any) {
    this.loadingService.show();
    this.service.getByIDCompany(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.dataCompany = result.data[0];
          }, 500);
        }
      },
      (error: any) => {
        this.loadingService.show();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiFollow() {
    if (this.isRole !== this.SYSTEM_ROLE.CANDIDATE) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Bạn không phải là ứng viên!',
      });
      return;
    }

    this.loadingService.show();
    this.service.followCompany({
      companyID: this.dataCompany.companyID,
      userID: removeQuotes(getFromLocalStorage('userID'))
    }).subscribe(
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

  apiGetAllRecruitment(payload: any) {
    this.loadingService.show();
    this.service.getAllRecruitmentHeader(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listRecruitment = result.data.filter((recruitment: any) => {
              for (let i = 0; i < this.listProduct.length; i++) {
                if (this.listProduct[i].userID === recruitment.userID
                  && this.listProduct[i].totalExpiration > 0) {

                  if (this.SERVICE_PACK.HIEU_UNG_DO_DAM === this.listProduct[i].servicePackName) {
                    recruitment.HIEU_UNG_DO_DAM = true;
                  } else if (this.SERVICE_PACK.CONG_TY_NOI_BAT === this.listProduct[i].servicePackName) {
                    recruitment.CONG_TY_NOI_BAT = true;
                  } else if (this.SERVICE_PACK.HIEU_UNG_HOT === this.listProduct[i].servicePackName) {
                    recruitment.HIEU_UNG_HOT = true;
                  } else if (this.SERVICE_PACK.HIEU_UNG_DONG_KHUNG === this.listProduct[i].servicePackName) {
                    recruitment.HIEU_UNG_DONG_KHUNG = true;
                  }

                }
              }
              return recruitment;
            });
            console.log(this.listRecruitment)
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
    if (this.isRole !== this.SYSTEM_ROLE.CANDIDATE) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Bạn không phải là ứng viên!',
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

  apiGetAllProduct() {
    this.loadingService.show();
    this.service.getAllProduct({
      status: this.PRODUCT_STATUS.PAID
    }).subscribe(
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
