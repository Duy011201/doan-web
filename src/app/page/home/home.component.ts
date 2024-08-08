import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, Color, LegendPosition } from '@swimlane/ngx-charts';
import { PrimengModule } from '../../core/modules/primeng.module';
import { CONSTANT } from '../../core/configs/constant.config';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NgxChartsModule, PrimengModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public genText: string | undefined;
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

  single = [
    {
      name: 'Germany',
      value: 40632,
      extra: {
        code: 'de',
      },
    },
    {
      name: 'United States',
      value: 50000,
      extra: {
        code: 'us',
      },
    },
    {
      name: 'France',
      value: 36745,
      extra: {
        code: 'fr',
      },
    },
    {
      name: 'United Kingdom',
      value: 36240,
      extra: {
        code: 'uk',
      },
    },
    {
      name: 'Spain',
      value: 33000,
      extra: {
        code: 'es',
      },
    },
    {
      name: 'Italy',
      value: 35800,
      extra: {
        code: 'it',
      },
    },
  ];
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
    setInterval(() => {
      this.generateRandomText();
    }, 1500);

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
}
