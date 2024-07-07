import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {SETTING} from "../../core/configs/setting.config";
import {AdminService} from "../admin.service";
import {environment} from '../../core/environments/develop.environment';

@Component({
  selector: 'app-admin-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {

  BLOG_STATUS = SETTING.BLOG_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  constructor(
    private messageService: MessageService,
    private adminService: AdminService,
    private confirmationService: ConfirmationService,
  ) {
  }

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: ''
  };

  listBlog: any = [];
  visible: boolean = false;
  loading: boolean = true;
  pathEnvironment = environment.API_URL;

  ngOnInit() {
    this.apiGetAll();
  }

  clear(table: Table) {
    table.clear();
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = {...data};

    switch (action) {
      case this.SYSTEM_ACTION.VIEW:
        this.dataDialog.headerDialog = 'View blog';
        this.dataDialog.subHeaderDialog = 'View blog information';
        break
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create blog';
        this.dataDialog.subHeaderDialog = 'Create blog information';
        break
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update blog';
        this.dataDialog.subHeaderDialog = 'Update blog information';
        break
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, blog: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Blog',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.apiDelete(blog);
      },
      reject: () => {}
    });
  }

  confirmLock(event: Event, company: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want lock?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        // this.apiLock(company);
      },
      reject: () => {}
    });
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    this.apiGetAll();
  }

  apiStatus(blog: any) {
    this.adminService.lockCompany({blogID: blog.blogID}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll();
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
    this.adminService.deleteCompany({blogID: blog.blogID}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.apiGetAll();
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

  apiGetAll() {
    this.adminService.getAllBlog({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listBlog = result.data;
          this.loading = false;
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
