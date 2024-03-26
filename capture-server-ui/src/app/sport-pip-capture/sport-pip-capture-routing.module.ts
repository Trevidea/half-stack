import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureDashboardPresenter } from './components/dashboard/dashboard.presenter';
import { ConnectionPresenter } from './components/connection/connection.presenter';
import { LogPresentert } from './components/log/log.presenter';
import { SharedPresenter } from './components/shared/shared.presenter';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { PastEventViewComponent } from './components/event/past-event/past-event-view/past-event-view.component';
import { PastEventViewPresenter } from './components/event/past-event/past-event-view/past-event-view.presenter';
import { ConnectionDeviceDetailComponent } from './components/connection/connection-device-detail/connection-device-detail.component';
import { ConnectionCardComponent } from './components/connection/card/connection-card/connection-card.component';
import { ConnectionStartComponent } from './components/connection/connection-start/connection-start.component';
import { EventPresenter } from './components/event/event.presenter';
import { CreateOnDemandEventPresenter } from './components/event/create-on-demand-event-form/create-on-demand-event.presenter';
import { MetaTypePresenter } from './components/meta-type/meta-type.presenter';
import { EventPreviewComponent } from './components/event/up-coming-event/components/event-preview/event-preview.component';


const routes: Routes = [
  {
    path: 'capture-dashboard', component: CaptureDashboardPresenter,
    canActivate: [AuthGuard]
  },
  {
    path: 'connection', component: ConnectionPresenter,
    children: [
      { path: '', component: ConnectionStartComponent },
      { path: 'connection-card-view', component: ConnectionCardComponent },
      { path: 'connection-device-detail', component: ConnectionDeviceDetailComponent },

    ]

  },
  { path: 'meta-types', component: MetaTypePresenter },
  { path: 'logs', component: LogPresentert },
  { path: 'on-demand-event', component: CreateOnDemandEventPresenter },
  { path: 'shared', component: SharedPresenter },


  { path: 'event', component: EventPresenter },
  { path: 'past-event-view', component: PastEventViewPresenter },
  { path: 'event/event-preview', component: EventPreviewComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportPipCaptureRoutingModule { }
