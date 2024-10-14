import { Routes } from '@angular/router';
import { PreviousEventsConnectionPresenter } from './previous-events-connection/previous-events-connection.presenter';
import { ConnectionComponent } from './connection.component';
import { LiveEventConnectionComponent } from './live-event-connection/live-event-connection.component';


export const ConnectionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/connections/connection',
                pathMatch: 'full',
            },
            {
                path: 'connection',
                component: ConnectionComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'live-connections',
                        pathMatch: 'full',
                    },
                    {
                        path: 'live-connections',
                        component: LiveEventConnectionComponent
                    }
                ]
            }
        ]
    }
]