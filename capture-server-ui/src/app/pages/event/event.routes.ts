import { Routes } from "@angular/router";
import { EventListGridTogglePresenter } from "./event-list-grid-toggle/events-list-grid-toggle.presenter";

export const EventsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/events/events-list',
                pathMatch: 'full',
            },
            { path: 'events-list', component: EventListGridTogglePresenter },
        ]
    }
]