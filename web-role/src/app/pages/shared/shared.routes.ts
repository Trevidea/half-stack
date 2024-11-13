import { Routes } from "@angular/router";
import { SharedPresenter } from "./shared.presenter";

export const SharedRoutes: Routes=[{
    path:'',
    children: [
        {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
        },
        {
            path: 'share-list',
            component: SharedPresenter
        }
    ]
}]