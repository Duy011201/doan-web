import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SETTING } from '../../core/configs/setting.config';
import { EmployerService } from '../employer.service';
import { environment } from '../../core/environments/develop.environment';
import { CONSTANT } from '../../core/configs/constant.config';
import { LoadingService } from '../../core/services/loading.service';
import { removeQuotes, getFromLocalStorage } from '../../core/commons/func';
import * as _ from 'lodash';

@Component({
  selector: 'app-employer-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  LIST_BLOG_STATUS: any = CONSTANT.BLOG_STATUS;
  BLOG_STATUS: any = SETTING.BLOG_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  constructor(
    private messageService: MessageService,
    private service: EmployerService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) {}

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };

  listBlog: any = [];
  visible: boolean = false;
  loading: boolean = true;
  selectedStatusBlog = { CODE: '', NAME: '' };
  pathEnvironment = environment.API_URL;
  payload: any = {
    userID: removeQuotes(getFromLocalStorage('userID')),
  };

  ngOnInit() {
    this.apiGetAll(this.payload);
  }

  clear(table: Table) {
    this.selectedStatusBlog = { CODE: '', NAME: '' };
    this.apiGetAll(this.payload);
    table.clear();
  }

  onSearch() {
    let payload = _.clone(this.payload);
    payload.status = this.selectedStatusBlog.CODE;
    this.apiGetAll(payload);
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = { ...data };

    switch (action) {
      case this.SYSTEM_ACTION.VIEW:
        this.dataDialog.headerDialog = 'View blog';
        this.dataDialog.subHeaderDialog = 'View blog information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create blog';
        this.dataDialog.subHeaderDialog = 'Create blog information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update blog';
        this.dataDialog.subHeaderDialog = 'Update blog information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, blog: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this blog?',
      header: 'Delete Blog',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.apiDelete(blog);
      },
      reject: () => {},
    });
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll(this.payload);
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  apiStatus(item: any, status: string) {
    this.service
      .statusBlog({
        blogID: item.blogID,
        status: status,
        updatedBy: removeQuotes(getFromLocalStorage('userID')),
      })
      .subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result.message,
            });
            this.apiGetAll(this.payload);
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

  apiDelete(blog: any) {
    this.service.deleteBlog({ blogID: blog.blogID }).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll(this.payload);
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

  apiGetAll(payload: any) {
    this.loadingService.show();
    this.service.getAllBlog(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          setTimeout(() => {
            this.loadingService.hide();
            this.listBlog = result.data;
            this.loading = false;
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
