import { Routes } from "@angular/router";
import { DashboardPresenter } from "./dashboard.presenter";

export const DashboardRoutes : Routes =[
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardPresenter
            }
        ]
    }
]