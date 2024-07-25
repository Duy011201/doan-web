import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {LoadingComponent} from '../component/loading/loading.component';
import {PrimengModule} from '../core/modules/primeng.module';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RequestApiService} from '../core/services/request-api.service';
import {QuillModule} from 'ngx-quill';
import {HttpClientModule} from '@angular/common/http';
import {LoadingService} from '../core/services/loading.service';
import {DynamicPipe} from "../core/pipes/dynamic-pipe";

@NgModule({
  declarations: [LoadingComponent, DynamicPipe],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    ReactiveFormsModule,
    QuillModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    QuillModule,
    PrimengModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    LoadingComponent,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicPipe
  ],
  providers: [
    RequestApiService,
    ConfirmationService,
    MessageService,
    LoadingService,
  ],
})
export class SharedModule {
  constructor() {
  }
}
