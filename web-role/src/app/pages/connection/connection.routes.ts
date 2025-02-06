import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection.component';
import { ConnectionDeviceDetailPresenter } from './connection-device-detail/connection-device-detail.presenter';
import { LiveEventConnectionPresenter } from './live-event-connection/live-event-connection.presenter';
import { StreamingConfigurationComponent } from './connection-device-detail/streaming-configuration/streaming-configuration.component';


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
                        component: LiveEventConnectionPresenter
                    },

                    // {
                    //     path: 'configuration',
                    //     component: StreamingConfigurationComponent
                    // }

                ]
            },
            {
                path: 'streaming-device-details',
                component: ConnectionDeviceDetailPresenter
            },
        ]
    }
]