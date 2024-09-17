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
  templateUrl: './search-company.component.html',
  styleUrl: './search-company.component.scss',
})
export class SearchCompanyComponent implements OnInit {
  listCompany: any = [];
  listProduct: any = [];
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  LIST_PROVINCE = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD = CONSTANT.COMPANY_FIELD;
  PRODUCT_STATUS = SETTING.PRODUCT_STATUS;
  SERVICE_PACK = SETTING.SERVICE_PACK
  payload: any = {
    companyName: '',
    province: '',
    field: ''
  };
  selectedProvince = {CODE: '', NAME: ''}
  selectedField = {CODE: '', NAME: ''}
  isTop: boolean = true

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.apiGetAllCompany(this.payload);
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  onChangeTop(isTop: boolean){
    this.isTop = isTop;
    if (this.isTop) {
      this.apiGetAllProduct();
    } else {
      this.listProduct = [];
      this.apiGetAllCompany(this.payload)
    }
  }

  onSearch() {
    // Xử lý điều kiện tên công ty
    if (this.payload.companyName) {
      this.payload.companyName = this.payload.companyName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-');
    }

    this.payload.province = this.selectedProvince ? this.selectedProvince.CODE : '';
    this.payload.field = this.selectedField ? this.selectedField.CODE : '';
    this.apiGetAllCompany(this.payload);
  }

  clear() {
    this.payload = {
      companyName: '',
      province: '',
      field: ''
    };
    this.selectedProvince = {CODE: '', NAME: ''}
    this.selectedField = {CODE: '', NAME: ''}
    this.apiGetAllCompany(this.payload);
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

            this.listCompany = this.listCompany
              .filter((company: any) => {
                const product = this.listProduct.find((product: any) =>
                  product.userID === company.userID &&
                  product.servicePackName === this.SERVICE_PACK.CONG_TY_NOI_BAT &&
                  product.totalExpiration > 0
                );

                company.isTop = !!product;
                return company;
              })
              .sort((a: any, b: any) => {
                return (a.isTop === b.isTop) ? 0 : a.isTop ? -1 : 1;
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

  apiGetAllCompany(payload: any) {
    this.loadingService.show();
    this.service.getAllCompanyHeader(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listCompany = result.data;
            if (this.isTop) {
              this.apiGetAllProduct();
            }
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
