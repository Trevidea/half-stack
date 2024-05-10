import { NgModule } from "@angular/core";
import { SettingComponent } from "./setting.component";
import { SettingHeaderComponent } from "./setting-header/setting-header.component";
import { AccountComponent } from "./account/account.component";
import { AccountPresenter } from "./account/account.presenter";
import { FilesComponent } from "./files/files.component";
import { SharingComponent } from "./sharing/sharing.component";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { GroupDetailComponent } from "./create-group/group-detail/group-detail.component";
import { PreferencesComponent } from "./preferences/preferences.component";
import { LiceneseComponent } from "./licenese/licenese.component";
import { CoachHomeSidebarComponent } from "./coach-home-sidebar/coach-home-sidebar.component";
import { DistributionListComponent } from "./distribution-list/distribution-list.component";
import { DistributionListPresenter } from "./distribution-list/distribution-list.presenter";
import { SettingBodyComponent } from "./setting-body/setting-body.component";
import { SharingPresenter } from "./sharing/sharing.presenter";
import { FilePresenter } from "./files/files.presenter";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SettingRoutingModule } from "./setting-routing.module";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { NgxColorsModule } from "ngx-colors";
import { NgSelectModule } from "@ng-select/ng-select";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { CoreSidebarModule } from "@core/components";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { UserComponent } from "./user/user.component";
import { RegisteredUserComponent } from "./user/component/registered-user/registered-user.component";
import { BlockedUserComponent } from "./user/component/blocked-user/blocked-user.component";
import { DeviceComponent } from "./user/component/device/device.component";
import { RegisteredUserPresenter } from "./user/component/registered-user/registered-user.presenterts";
import { BlockedUserPresenter } from "./user/component/blocked-user/blocked-user.presenter";
import { DevicePresenter } from "./user/component/device/devicepresenter";
import { DeviceFormComponent } from "./user/component/device-form/device-form.component";
import { DeviceFormPresenter } from "./user/component/device-form/device-form.presenter";
import { InlineFormeModule } from "app/sport-pip-capture/blocks/inline-modal/inline-form-module";

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
    SettingBodyComponent,
    SharingPresenter,
    FilePresenter,
    UserComponent,
    RegisteredUserComponent,
    BlockedUserComponent,
    DeviceComponent,
    RegisteredUserPresenter,
    BlockedUserPresenter,
    DevicePresenter,
    DeviceFormComponent,
    DeviceFormPresenter,
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
    Ng2FlatpickrModule,
    InlineFormeModule,
  ],
})
export class SettingModule {}
