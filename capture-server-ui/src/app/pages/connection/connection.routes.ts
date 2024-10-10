import { Routes } from '@angular/router';
import { PreviousEventsConnectionPresenter } from './previous-events-connection/previous-events-connection.presenter';


export const ConnectionRoutes: Routes =[
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/connections/previous-event-connection',
                pathMatch: 'full',
            },
            {
                path: 'previous-event-connection',
                component: PreviousEventsConnectionPresenter
            }
        ]
    }
]