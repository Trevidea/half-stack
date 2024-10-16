import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection.component';
import { LiveEventConnectionComponent } from './live-event-connection/live-event-connection.component';
import { ConnectionDeviceDetailPresenter } from './connection-device-detail/connection-device-detail.presenter';


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
                    },
                    {
                        path: 'player',
                        component: ConnectionDeviceDetailPresenter
                    }
                ]
            }
        ]
    }
]