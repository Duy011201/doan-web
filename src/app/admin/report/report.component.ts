import {Component} from '@angular/core';
import {getFromLocalStorage, removeQuotes} from "../../core/commons/func";
import {MessageService} from "primeng/api";
import {LoadingService} from "../../core/services/loading.service";
import {SETTING} from "../../core/configs/setting.config";
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-admin-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  basicData: any = {
    labels: [],
    datasets: []
  };
  basicOptions: any;
  listChart1: any = [];
  listChart2: any = [];
  listData: any = [];
  payload: any = {
    keyword: '',
  }

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData.labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

    this.basicOptions = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder
          }
        }
      }
    };
  }

  onSearch(keyword: string) {
    this.payload.keyword = keyword;
    this.apiGetReportAdmin(this.payload)
  }

  apiGetReportAdmin(payload: any) {
    this.loadingService.show();
    this.service.getReportAdmin(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listData = result.data;
            this.listChart1 = new Array(12).fill(0);
            this.listChart2 = new Array(12).fill(0);

            if (this.payload.keyword === 'service_pack') {
              this.listData.forEach((item: any) => {
                const month = new Date(item.updatedAt).getUTCMonth();
                this.listChart1[month]++;
                if (item.count > 0) {
                  const totalPrice = item.price * item.count * (1 - item.promotion / 100);
                  this.listChart2[month] += totalPrice;
                } else {
                  const totalPrice = item.price * (1 - item.promotion / 100);
                  this.listChart2[month] += totalPrice;
                }
              });
            } else if (this.payload.keyword === 'recruitment') {
              this.listData.forEach((item: any) => {
                const month = new Date(item.updatedAt).getUTCMonth();
                this.listChart1[month] += item.recruitmentCount;
                this.listChart2[month] += item.recruitmentProcessCount;
              });
            }

            this.basicData = {
              labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
              datasets: [
                {
                  label: this.payload.keyword === 'service_pack' ? 'Số gói dịch vụ' : 'Số tin tuyển dụng',
                  data: this.listChart1,
                  fill: false,
                  yAxisID: this.payload.keyword === 'service_pack' ? 'y' : 'none',
                  borderColor: ['rgba(54, 162, 235, 0.2)'],
                  tension: 0.4
                },
                {
                  label: this.payload.keyword === 'service_pack' ? 'Số tiền' : 'Số ứng viên',
                  data: this.listChart2,
                  fill: false,
                  yAxisID: this.payload.keyword === 'service_pack' ? 'y1' : 'none',
                  borderColor: ['rgba(181,54,235,0.2)'],
                  tension: 0.4
                }
              ]
            };

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
