import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { PageService } from '../../page.service';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';

@Component({
  selector: 'app-admin-blog-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogBlogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_STATUS: any = CONSTANT.BLOG_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  selectStatus: any = {};

  constructor(
    private messageService: MessageService,
    private service: PageService
  ) {}

  ngOnInit() {}

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.selectStatus = this.LIST_STATUS.find(
      (item: any) => item.CODE === this.data.status
    );
  }

  private validInput(): boolean {
    let errorMessage = '';

    if (isEmpty(this.data.title)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_TITLE_FORMAT;
    } else if (isEmpty(this.selectStatus)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_STATUS;
    } else if (isEmpty(this.data.content)) {
      errorMessage = SETTING.SYSTEM_HTTP_MESSAGE.INVALID_CONTENT_FORMAT;
    }

    if (!isEmpty(errorMessage)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      return false;
    }

    return true;
  }

  public async onCreateBlog(): Promise<void> {
    const createdBy = removeQuotes(getFromLocalStorage('userID'));

    if (this.validInput()) {
      this.data = trimStringObject(this.data);

      const payload = {
        title: this.data.title || '',
        keyword: this.data.keyword || '',
        content: this.data.content || '',
        createdBy: createdBy,
      };
      this.apiCreate(payload);
    }
  }

  public async onUpdateBlog(): Promise<void> {
    const updatedBy = removeQuotes(getFromLocalStorage('userID'));

    if (this.validInput()) {
      this.data = trimStringObject(this.data);
      const payload = {
        blogID: this.data.blogID,
        title: this.data.title || '',
        keyword: this.data.keyword || '',
        content: this.data.content || '',
        status: this.selectStatus.CODE || this.data.status,
        updatedBy: updatedBy,
      };

      this.apiUpdate(payload);
    }
  }

  apiCreate(payload: any) {
    this.service.createBlog(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
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

  apiUpdate(payload: any) {
    this.service.updateBlog(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
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
