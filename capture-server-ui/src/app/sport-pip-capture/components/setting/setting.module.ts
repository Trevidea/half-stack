import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AccountComponent } from './account/account.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupDetailComponent } from './create-group/group-detail/group-detail.component';
import { FilesComponent } from './files/files.component';
import { LiceneseComponent } from './licenese/licenese.component';
import { CoreSidebarModule } from '@core/components';
import { PreferencesComponent } from './preferences/preferences.component';
import { SettingHeaderComponent } from './setting-header/setting-header.component';
import { SettingComponent } from './setting.component';
import { SharingComponent } from './sharing/sharing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoachHomeSidebarComponent } from './coach-home-sidebar/coach-home-sidebar.component';
import { CoreCommonModule } from '@core/common.module';
import { DistributionListComponent } from './distribution-list/distribution-list.component';
import { NgxColorsModule } from 'ngx-colors';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettingBodyComponent } from './setting-body/setting-body.component';
import { AccountPresenter } from './account/account.presenter';
import { DistributionListPresenter } from './distribution-list/distribution-list.presenter';
import { SharingPresenter } from './sharing/sharing.presenter';
import { FormsModule } from '@angular/forms';
import { FilePresenter } from './files/files.presenter';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';



@NgModule({
  declarations: [
    SettingComponent,
    SettingHeaderComponent,
    AccountComponent,
    AccountPresenter,
    FilesComponent,
    SharingComponent,
    CreateGroupComponent,
    GroupDetailComponent,
    PreferencesComponent,
    LiceneseComponent,
    CoachHomeSidebarComponent,
    DistributionListComponent,
    DistributionListPresenter,
    SettingBodyComponent ,
    SharingPresenter,
    FilePresenter
    ],
  imports: [
    CommonModule,
    FormsModule,
    SettingRoutingModule,
    CoreCommonModule,
    NgbModule,
    PerfectScrollbarModule,
    ContentHeaderModule,
    NgxColorsModule,
    NgSelectModule,
    CorePipesModule,
    CoreSidebarModule,
    Ng2FlatpickrModule
  ]
})
export class SettingModule { }
