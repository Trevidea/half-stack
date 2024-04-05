import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaptureDashboardPresenter } from "./components/dashboard/dashboard.presenter";
import { ConnectionPresenter } from "./components/connection/connection.presenter";
import { LogPresentert } from "./components/log/log.presenter";
import { SharedPresenter } from "./components/shared/shared.presenter";
import { AuthGuard } from "app/auth/helpers/auth.guards";
import { ConnectionDeviceDetailComponent } from "./components/connection/connection-device-detail/connection-device-detail.component";
import { ConnectionStartComponent } from "./components/connection/connection-start/connection-start.component";
import { EventPresenter } from "./components/event/event.presenter";
import { CreateOnDemandEventPresenter } from "./components/event/create-on-demand-event-form/create-on-demand-event.presenter";
import { MetaTypePresenter } from "./components/meta-type/meta-type.presenter";
import { PastEventViewPresenter } from "./components/event/grid-view-ui/past-event/past-event-view/past-event-view.presenter";
import { EventPreviewComponent } from "./components/event/grid-view-ui/up-coming-event/components/event-preview/event-preview.component";
import { EventPreviewPresenter } from "./components/event/grid-view-ui/up-coming-event/components/event-preview/event-preview.presenter";
import { DatatablesService } from "app/main/tables/datatables/datatables.service";

const routes: Routes = [
  {
    path: "capture-dashboard",
    component: CaptureDashboardPresenter,
    canActivate: [AuthGuard],
  },
  {
    path: "connection",
    component: ConnectionPresenter,
    children: [
      { path: "", component: ConnectionStartComponent },
      {
        path: "connection-device-detail/:id",
        component: ConnectionDeviceDetailComponent,
      },
    ],
  },
  {
    path: "connection/event-preview",
    component: EventPreviewPresenter,
    resolve: {
      datatables: DatatablesService,
    },
    data: { animation: "datatables" },
  },
  { path: "meta-types", component: MetaTypePresenter },
  { path: "logs", component: LogPresentert },
  { path: "on-demand-event", component: CreateOnDemandEventPresenter },
  { path: "shared", component: SharedPresenter },

  { path: "event", component: EventPresenter },
  { path: "past-event-view", component: PastEventViewPresenter },
  { path: "event/event-preview", component: EventPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatatablesService],
})
export class SportPipCaptureRoutingModule {}
