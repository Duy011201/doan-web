import { Component } from '@angular/core';
import { SETTING } from '../../core/configs/setting.config';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-menu-left',
  standalone: false,
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss',
})
export class MenuLeftComponent {
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public isRouteActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }
}
