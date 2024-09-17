import {Component, OnInit} from '@angular/core';
import {NgxChartsModule, Color, LegendPosition} from '@swimlane/ngx-charts';
import {PrimengModule} from '../../core/modules/primeng.module';
import {CONSTANT} from '../../core/configs/constant.config';
import {SETTING} from "../../core/configs/setting.config";
import {MessageService} from "primeng/api";
import {AdminService} from "../../admin/admin.service";
import {SharedModule} from "../../share/share.module";
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SharedModule, NgxChartsModule, PrimengModule],
  providers: [AdminService, MessageService, LoadingService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public genText: string | undefined;
  public genDay: any | undefined;
  public countRecruitment: any = {
    countIn24h: 0,
    countAll: 0
  };
  public listCompany = CONSTANT.LOGO_COMPANY;
  public responsiveOptions: any[] | undefined;
  private listGenText = [
    'Định hướng nghề nghiệp',
    'Phúc lợi tốt',
    'Mức lương cao',
    'Công ty phù hợp',
    'Việc làm mới',
    'CV mới',
  ];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private loadingService: LoadingService
  ) {
  }

  single = [];
  public view: [number, number] = [800, 300];

  // options
  public scheme = 'air';
  public doughnut: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = true;
  public animations: boolean = true;
  public legendPosition: LegendPosition = LegendPosition.Right;

  ngOnInit(): void {
    this.apiGetAllHome();
    this.apiGetAllCountRecruitment();
    this.generateRandomText();
    this.generateDay();

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  public onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  public onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  public onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private generateRandomText(): void {
    const randomIndex = Math.floor(Math.random() * this.listGenText.length);
    this.genText = this.listGenText[randomIndex];
  }

  private generateDay(): void {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    this.genDay = dd + '/' + mm + '/' + yyyy;
  }

  private apiGetAllHome() {
    this.loadingService.show();
    this.service.getAllHome({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();

            this.single = result.data.map((item: any) => ({
              name: item.field.replace(/_/g, ' '),
              value: item.count,
              extra: {
                code: item.field,
              },
            }));
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

  private apiGetAllCountRecruitment() {
    this.loadingService.show();
    this.service.getAllCountRecruitment({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.countRecruitment = result.data[0];
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
