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
import { EditProfileComponent } from "./account/components/edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: "settings",
    component: SettingComponent,
    children: [
      {
        path: "settings", redirectTo: 'settings/account',
      },
      {
        path: 'account/edit-profile', component: EditProfileComponent
      },
      { path: "account", component: AccountPresenter },
      { path: "file", component: FilePresenter },
      { path: "user", component: UserComponent },
      { path: "sharing", component: SharingPresenter },
      { path: "preferences", component: PreferencesComponent },
      { path: "licenese", component: LiceneseComponent },
      { path: "mediaserver", component: MediaServerComponent },
      {
        path: "**",
        redirectTo: "/pages/miscellaneous/error", //Error 404 - Page not found
      },
    ],
  },
];
// /settings/account
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule { }
