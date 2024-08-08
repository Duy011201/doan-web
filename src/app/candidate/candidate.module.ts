import {NgModule} from '@angular/core';
import {CandidateService} from './candidate.service';
import {EmployerRoutesModule} from './candidate.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MenuLeftComponent} from './menu-left/menu-left.component';
import {BlogComponent} from './blog/blog.component';
import {DialogBlogComponent} from './blog/dialog/dialog.component';
import {SharedModule} from '../share/share.module';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {RecruitmentProcessComponent} from "./recruitment-process/recruitment-process.component";
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  imports: [EmployerRoutesModule, SharedModule, PdfViewerModule],
  declarations: [
    DashboardComponent,
    MenuLeftComponent,
    BlogComponent,
    DialogBlogComponent,
    ChangePasswordComponent,
    RecruitmentProcessComponent,
  ],
  providers: [CandidateService],
})
export class CandidateModule {
}
