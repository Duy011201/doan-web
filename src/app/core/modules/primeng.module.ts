import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TreeModule } from 'primeng/tree';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [
    AnimateOnScrollModule,
    AvatarModule,
    BreadcrumbModule,
    ButtonModule,
    CascadeSelectModule,
    CheckboxModule,
    ChartModule,
    ChipModule,
    ChipsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    MenuModule,
    MessageModule,
    ProgressSpinnerModule,
    RippleModule,
    SelectButtonModule,
    SidebarModule,
    TableModule,
    TagModule,
    ToastModule,
    TreeModule,
    CardModule,
    TimelineModule,
  ],
  exports: [
    AnimateOnScrollModule,
    AvatarModule,
    BreadcrumbModule,
    ButtonModule,
    CascadeSelectModule,
    CheckboxModule,
    ChartModule,
    ChipModule,
    ChipsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    MenuModule,
    MessageModule,
    ProgressSpinnerModule,
    RippleModule,
    SelectButtonModule,
    SidebarModule,
    TableModule,
    TagModule,
    ToastModule,
    TreeModule,
    CardModule,
    TimelineModule,
  ],
  providers: [MessageService],
})
export class PrimengModule {}
