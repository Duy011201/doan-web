import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EmployerService} from '../../employer/employer.service';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {LoadingService} from '../../core/services/loading.service';
import {SharedModule} from '../../share/share.module';
import {CONSTANT} from "../../core/configs/constant.config";
import dayjs from "dayjs";

@Component({
  selector: 'app-employer-search-company',
  standalone: true,
  imports: [SharedModule],
  providers: [EmployerService, MessageService, LoadingService],
  templateUrl: './search-recruitment.component.html',
  styleUrl: './search-recruitment.component.scss',
})
export class SearchRecruitmentComponent implements OnInit {
  listProduct: any = [];
  listRecruitment: any = [];
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  LIST_PROVINCE = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD = CONSTANT.COMPANY_FIELD;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SERVICE_PACK = SETTING.SERVICE_PACK;
  RECRUITMENT = SETTING.RECRUITMENT;
  payload: any = {
    keyword: '',
    province: '',
    field: '',
    status: this.RECRUITMENT.PUBLISHED
  };
  selectedProvince = {CODE: '', NAME: ''}
  selectedField = {CODE: '', NAME: ''}

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.apiGetAllProduct();
    this.apiGetAllRecruitment(this.payload);
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
    this.payload.field = this.selectedField ? this.selectedField.CODE : '';
    this.apiGetAllRecruitment(this.payload);
  }

  clear() {
    this.selectedProvince = {CODE: '', NAME: ''}
    this.selectedField = {CODE: '', NAME: ''}
    this.payload = {
      keyword: '',
      province: '',
      field: '',
      status: this.RECRUITMENT.PUBLISHED
    }
    this.apiGetAllRecruitment(this.payload);
  }

  apiGetAllProduct() {
    this.loadingService.show();
    this.service.getAllProduct({
      status: this.PRODUCT_STATUS.PAID
    }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
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

            console.log(this.listProduct)

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
            this.loadingService.hide();
            this.listRecruitment = result.data;

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
}
