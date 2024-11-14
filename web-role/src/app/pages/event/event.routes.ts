import { Routes } from "@angular/router";
import { EventListGridTogglePresenter } from "./event-list-grid-toggle/events-list-grid-toggle.presenter";
import { OnDemandEventFormPresenter } from "./event-form/on-demand-event-form/on-demand-event-form.presenter";
import { PastEventDetailPresenter } from "./event-details/components/past-event-detail/past-event-detail.presenter";
import { EventPreviewPresenter } from "./event-preview/event-preview.presenter";

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
            { path: 'create/on-demand-event', component: OnDemandEventFormPresenter },
            { path: 'edit/on-demand-event/:id', component: OnDemandEventFormPresenter },
            { path: 'past-event-details/:id', component: PastEventDetailPresenter },
            { path: 'preview/:id', component: EventPreviewPresenter },
            { path: 'repeat-previous-event/:id', component: OnDemandEventFormPresenter }
        ]
    }
]