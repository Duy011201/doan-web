import {ChangeDetectorRef, Component} from '@angular/core';
import {SETTING} from "../../core/configs/setting.config";
import {ConfirmationService, MessageService} from "primeng/api";
import {EmployerService} from "../employer.service";
import {LoadingService} from "../../core/services/loading.service";
import {getFromLocalStorage, removeQuotes} from "../../core/commons/func";
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-employer-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  basicData: any;
  basicOptions: any;
  listChart: any = [];
  listMonthlyData: any = [];
  listData: any = [];
  payload: any = {
    keyword: '',
    userID: removeQuotes(getFromLocalStorage('userID'))
  }

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: 'Biểu đồ',
          data: [],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgb(54, 162, 235)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  onSearch(keyword: string) {
    this.payload.keyword = keyword;
    this.apiGetReportEmployer(this.payload)
  }

  apiGetReportEmployer(payload: any) {
    this.loadingService.show();
    this.service.getReportEmployer(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.listData = result.data;
            this.listChart = new Array(12).fill(0);
            this.listMonthlyData = {
              'Tháng 1': [],
              'Tháng 2': [],
              'Tháng 3': [],
              'Tháng 4': [],
              'Tháng 5': [],
              'Tháng 6': [],
              'Tháng 7': [],
              'Tháng 8': [],
              'Tháng 9': [],
              'Tháng 10': [],
              'Tháng 11': [],
              'Tháng 12': []
            };

            this.listData.forEach((item: any) => {
              const createdAt = new Date(item.createdAt);
              const month = createdAt.getUTCMonth(); // Tháng từ 0-11 (0 là tháng 1, 11 là tháng 12)
              const monthName = `Tháng ${month + 1}`;
              this.listMonthlyData[monthName].push(item);
              this.listChart[month]++;
            });

            this.basicData = {
              labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
              datasets: [
                {
                  label: this.payload.keyword === 'candidate' ? 'Số lượng ứng viên' : 'Số lượng tin tuyển dụng',
                  data: this.listChart,
                  backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgb(54, 162, 235)'],
                  borderWidth: 1
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

  onExportExcel() {
    const headers = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    if (this.payload.keyword === 'candidate') {
      // Tạo dữ liệu cho sheet
      const sheetData: any[] = [];

      // Tìm số lượng mục dữ liệu tối đa trong bất kỳ tháng nào
      const maxItems = Math.max(...Object.values(this.listMonthlyData).map((item: any) => item.length));

      for (let i = 0; i < maxItems; i++) {
        const row: any = {};
        headers.forEach((month, index) => {
          // Lấy dữ liệu cho từng tháng, sử dụng thuộc tính cần thiết từ đối tượng
          const item = this.listMonthlyData[month][i];
          row[month] = item ? `${item?.email} - ${item?.title}` : ''; // Thay đổi nếu cần
        });
        sheetData.push(row);
      }

      // Tạo worksheet từ dữ liệu
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData, { header: headers });

      // Thay đổi kích thước cột
      const colWidths = headers.map(header => ({ wpx: 100 }));
      ws['!cols'] = colWidths;

      // Tạo workbook và thêm worksheet vào đó
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo');

      // Xuất file Excel
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'baocao.xlsx');

    } else {
      // Tạo dữ liệu cho sheet
      const sheetData = headers.map((header, index) => ({
        'Tháng': header,
        'Tin tuyển dụng': this.listChart[index] || 0
      }));

      // Chuyển đổi dữ liệu sang sheet Excel
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData, { header: ['Tháng', 'Tin tuyển dụng'] });

      // Thay đổi kích thước cột
      const colWidths = [{ wpx: 150 }, { wpx: 100 }]; // Kích thước cột cho hai cột
      ws['!cols'] = colWidths;

      // Tạo workbook và thêm worksheet vào đó
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo');

      // Xuất file Excel
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'baocao.xlsx');
    }
  }
}
