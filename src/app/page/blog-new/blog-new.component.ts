import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../admin/admin.service';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {LoadingService} from '../../core/services/loading.service';
import {SharedModule} from '../../share/share.module';

@Component({
  selector: 'app-admin-blog-new',
  standalone: true,
  imports: [SharedModule],
  providers: [AdminService, MessageService, LoadingService],
  templateUrl: './blog-new.component.html',
  styleUrl: './blog-new.component.scss',
})
export class BlogNewComponent implements OnInit {
  listBlog: any = [];
  listBlogView: any = [];
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  payload: any = {
    status: this.BLOG_STATUS.PUBLISHED,
  };
  keyword: string = '';

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.apiGetAll(this.payload);
    this.apiGetAllView();
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  apiView(item: any) {
    this.service
      .viewBlog({
        blogID: item.blogID,
      })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.massage || error.error.message,
          });
        }
      );
  }

  compareViews(a: any, b: any) {
    if (a.view > b.view) {
      return -1;
    } else if (a.view < b.view) {
      return 1;
    } else {
      return 0;
    }
  }

  onSearchKeyword() {
    let payload: any = this.payload;
    payload.keyword = this.keyword;
    if (typeof this.keyword === 'string') {
      payload.keyword = this.keyword
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/\s+/g, '-');
    }
    this.apiGetAll(payload);
  }

  apiGetAllView() {
    this.loadingService.show();
    this.service.getAllBlogHeader({status: this.BLOG_STATUS.PUBLISHED}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listBlogView = result.data.sort(this.compareViews);
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

  apiGetAll(payload: any) {
    this.loadingService.show();
    this.service.getAllBlogHeader(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listBlog = result.data;
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
