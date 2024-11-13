import { Routes } from "@angular/router";
import { LogListPresenter } from "./log-list/log-list.presenter";

export const LogsRoutes: Routes=[
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            },
            {
                path: 'logs-list', 
                component: LogListPresenter,
            }
        ]
    }
]