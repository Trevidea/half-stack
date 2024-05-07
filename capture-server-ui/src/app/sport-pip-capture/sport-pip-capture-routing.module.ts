import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaptureDashboardPresenter } from "./components/dashboard/dashboard.presenter";
import { ConnectionPresenter } from "./components/connection/connection.presenter";
// import { LogPresentert } from "./components/log/log.presenter";
import { SharedPresenter } from "./components/shared/shared.presenter";
import { AuthGuard } from "app/auth/helpers/auth.guards";
import { ConnectionDeviceDetailComponent } from "./components/connection/connection-device-detail/connection-device-detail.component";
import { EventPresenter } from "./components/event/event.presenter";
import { CreateOnDemandEventPresenter } from "./components/event/create-on-demand-event-form/create-on-demand-event.presenter";
import { MetaTypePresenter } from "./components/meta-type/meta-type.presenter";
import { PastEventViewPresenter } from "./components/event/grid-view-ui/past-event/past-event-view/past-event-view.presenter";
import { DatatablesService } from "app/main/tables/datatables/datatables.service";
import { ConnectionStartPresenter } from "./components/connection/connection-start/connection-start.presenter";
import { EventPreviewPresenter } from "./components/event/event-preview/event-preview.presenter";
import { LogSummaryComponent } from "./components/log/log-summary/log-summary.component";
import { LogListPresentert } from "./components/log/log-list/log-list.presenter";
import { LogComponent } from "./components/log/log.component";
import { ConnectionDeviceDetailPresenter } from "./components/connection/connection-device-detail/connection-device-detail.presenter";

const routes: Routes = [
  {
    path: "capture-dashboard",
    component: CaptureDashboardPresenter,
    canActivate: [AuthGuard],
  },
  {
    path: "logs",
    component: LogComponent,
    children: [
      { path: "", component: LogListPresentert },
      { path: "detail", component: LogSummaryComponent },
    ],
  },
  {
    path: "connection",
    component: ConnectionPresenter,
    children: [
      { path: "", component: ConnectionStartPresenter },
      // {
      //   path: "connection-device-detail/:id",
      //   component: ConnectionDeviceDetailComponent,
      // },
      {
        path: "connection-device-detail/:id",
        component: ConnectionDeviceDetailPresenter,
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

  { path: "on-demand-event", component: CreateOnDemandEventPresenter },
  { path: "shared", component: SharedPresenter },

  { path: "event", component: EventPresenter },
  { path: "past-event-view", component: PastEventViewPresenter },
  { path: "event/event-preview/:id", component: EventPreviewPresenter },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatatablesService],
})
export class SportPipCaptureRoutingModule {}
