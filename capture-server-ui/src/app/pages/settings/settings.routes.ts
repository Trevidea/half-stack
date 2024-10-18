import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { AccountComponent } from "./components/account/account.component";
import { UserComponent } from "./components/user/user.component";
import { FilesComponent } from "./components/files/files.component";
import { SharingComponent } from "./components/sharing/sharing.component";
import { PreferencesComponent } from "./components/preferences/preferences.component";
import { MediaServerComponent } from "./components/media-server/media-server.component";
import { AboutComponent } from "./components/about/about.component";
import { AccountPresenter } from "./components/account/account.presenter";

export const SettingsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/settings/main-page',
                pathMatch: 'full',
            },
            {
                path: "main-page",
                component: SettingsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/settings/main-page/account',
                        pathMatch: 'full',
                    },
                    {
                        path: "account",
                        component: AccountPresenter
                    },
                    {
                        path: "user",
                        component: UserComponent
                    },
                    {
                        path: "files",
                        component: FilesComponent
                    },
                    {
                        path: "sharing",
                        component: SharingComponent
                    },
                    {
                        path: "preferences",
                        component: PreferencesComponent
                    },
                    {
                        path: "media-server",
                        component: MediaServerComponent
                    },
                    {
                        path: "about",
                        component: AboutComponent
                    },
                ]
            }
        ]
    }
]