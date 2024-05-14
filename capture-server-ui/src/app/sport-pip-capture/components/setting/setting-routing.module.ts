import { NgModule } from "@angular/core";
import { SettingComponent } from "./setting.component";
import { AccountComponent } from "./account/account.component";
import { FilesComponent } from "./files/files.component";
import { SharingComponent } from "./sharing/sharing.component";
import { PreferencesComponent } from "./preferences/preferences.component";
import { LiceneseComponent } from "./licenese/licenese.component";
import { AccountPresenter } from "./account/account.presenter";
import { SharingPresenter } from "./sharing/sharing.presenter";
import { FilePresenter } from "./files/files.presenter";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { MediaServerComponent } from "./media-server/media-server.component";

const routes: Routes = [
  {
    path: ":settings",
    component: SettingComponent,
    children: [
      { path: "account", component: AccountPresenter },
      { path: "file", component: FilePresenter },
      { path: "user", component: UserComponent },
      { path: "sharing", component: SharingPresenter },
      { path: "preferences", component: PreferencesComponent },
      { path: "licenese", component: LiceneseComponent },
      { path: "mediaserver", component: MediaServerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
