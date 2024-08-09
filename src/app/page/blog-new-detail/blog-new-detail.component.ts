import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin/admin.service';
import { SETTING } from '../../core/configs/setting.config';
import { environment } from '../../core/environments/develop.environment';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../share/share.module';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-admin-blog-new',
  standalone: true,
  imports: [SharedModule],
  providers: [AdminService, MessageService],
  templateUrl: './blog-new-detail.component.html',
  styleUrl: './blog-new-detail.component.scss',
})
export class BlogNewDetailComponent implements OnInit {
  itemBlog: any = {};
  listBlogView: any = [];
  pathEnvironment = environment.API_URL;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.apiGetByID({ blogID: params['id'] });
    });
    this.apiGetAll();
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

  apiGetAll() {
    this.loadingService.show();
    this.service.getAllBlogHeader({ status: this.BLOG_STATUS.PUBLISHED }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listBlogView = result.data.sort(this.compareViews);
          }, 500);
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

  apiGetByID(payload: any) {
    this.loadingService.show();
    this.service.getByIDBlog(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.itemBlog = result.data[0];
          }, 500);
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
}
