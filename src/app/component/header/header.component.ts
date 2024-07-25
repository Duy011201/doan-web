import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SETTING } from '../../core/configs/setting.config';
import { CommonModule } from '@angular/common';
import {getFromLocalStorage, removeQuotes} from "../../core/commons/func";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  isEmployer = removeQuotes(getFromLocalStorage('role'))

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public isRouteActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }
}
