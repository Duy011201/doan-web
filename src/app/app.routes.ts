import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {HomeComponent} from './page/home/home.component';
import {SETTING} from './core/configs/setting.config';
import {TablePriceComponent} from './page/table-price/table-price.component';
import {BlogNewComponent} from './page/blog-new/blog-new.component';
import {BlogNewDetailComponent} from './page/blog-new-detail/blog-new-detail.component';
import {SearchCompanyComponent} from "./page/search-company/search-company.component";
import {SearchCompanyDetailComponent} from "./page/search-company-detail/search-company-detail.component";
import {SearchRecruitmentComponent} from "./page/search-recruitment/search-recruitment.component";
import {SearchRecruitmentDetailComponent} from "./page/search-recruitment-detail/search-recruitment-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: SETTING.SYSTEM_PAGE.HEADER_HOME, pathMatch: 'full'},
  {
    path: SETTING.SYSTEM_PAGE.HEADER_HOME,
    component: HomeComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_AUTH,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: {showHeader: false, showFooter: false},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_ADMIN,
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_EMPLOYER,
    loadChildren: () => import('./employer/employer.module').then((m) => m.EmployerModule),
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_CANDIDATE,
    loadChildren: () => import('./candidate/candidate.module').then((m) => m.CandidateModule),
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_TABLE_PRICE,
    component: TablePriceComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_SEARCH_COMPANY,
    component: SearchCompanyComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_SEARCH_COMPANY_DETAIL,
    component: SearchCompanyDetailComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_SEARCH_RECRUITMENT,
    component: SearchRecruitmentComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_SEARCH_RECRUITMENT_DETAIL,
    component: SearchRecruitmentDetailComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_BLOG_NEW,
    component: BlogNewComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.HEADER_BLOG_NEW_DETAIL,
    component: BlogNewDetailComponent,
    data: {showHeader: true, showFooter: true},
  },
  {
    path: SETTING.SYSTEM_PAGE.RELATED_404,
    component: PageNotFoundComponent,
    data: {showHeader: true, showFooter: true},
  },
];
