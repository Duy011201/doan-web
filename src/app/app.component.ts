import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  ActivationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {getFromLocalStorage, isEmpty, removeQuotes} from './core/commons/func';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import {MessageService} from "primeng/api";
import {LoadingService} from "./core/services/loading.service";
import {SharedModule} from "./share/share.module";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  providers: [MessageService, LoadingService],
})
export class AppComponent implements OnInit {
  /*
   * Default value for comp header and comp footer
   */
  public showHeader: boolean = false;
  public showFooter: boolean = false;

  /*
   * Get value from router
   */
  constructor(private router: Router, private messageService: MessageService,) {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map((event) => (<ActivationEnd>event).snapshot),
        map((snapshot) => (<ActivatedRouteSnapshot>snapshot).data)
      )
      .subscribe((data) => {
        const dataRouter = Object.assign({}, data);
        if (!isEmpty(dataRouter)) {
          this.showHeader = !!dataRouter?.['showHeader'];
          this.showFooter = !!dataRouter?.['showFooter'];
        }
      });
  }

  ngOnInit(): void {}
}
