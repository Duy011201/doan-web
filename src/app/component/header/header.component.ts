import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from '../../core/settings/const.setting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  SYSTEM_PAGE = CONSTANT.SYSTEM_PAGE;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public isRouteActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }
}
