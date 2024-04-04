import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SportPipCaptureRoutingModule } from "./sport-pip-capture-routing.module";
import { SportPipCaptureComponent } from "./sport-pip-capture.component";
import { CaptureDashboardComponent } from "./components/dashboard/dashboard.component";
import { TranslateModule } from "@ngx-translate/core";
import { CoreCommonModule } from "@core/common.module";
import { InvoiceModule } from "app/main/apps/invoice/invoice.module";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from "ng2-charts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CaptureDashboardPresenter } from "./components/dashboard/dashboard.presenter";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { TruncateWordsPipe } from "./pipes/truncate-words.pipe";
import { CoreSidebarModule } from "@core/components";
import { EventHeaderComponent } from "./components/event/event-header/event-header.component";
import { ConnectionComponent } from "./components/connection/connection.component";
import { ConnectionPresenter } from "./components/connection/connection.presenter";
import { PreviousEventsConnectionComponent } from "./components/connection/previous-events-connection/previous-events-connection.component";
import { ConnectionStartComponent } from "./components/connection/connection-start/connection-start.component";
import { DevicesConnectingComponent } from "./components/connection/devices-connecting/devices-connecting.component";
import { CreateOnDemandEventComponent } from "./components/event/create-on-demand-event-form/create-on-demand-event.component";
import { EventConnectionDetailComponent } from "./components/connection/event-connection-detail/event-connection-detail.component";
import { ConnectionCardComponent } from "./components/connection/card/connection-card/connection-card.component";
import { ConnectionDeviceDetailComponent } from "./components/connection/connection-device-detail/connection-device-detail.component";
import { LogComponent } from "./components/log/log.component";
import { LogPresentert } from "./components/log/log.presenter";
import { SharedComponent } from "./components/shared/shared.component";
import { SharedPresenter } from "./components/shared/shared.presenter";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { OngoingComponent } from "./components/dashboard/event-card/ongoing/ongoing.component";
import { UpcomingComponent } from "./components/dashboard/event-card/upcoming/upcoming.component";
import { PastComponent } from "./components/dashboard/event-card/past/past.component";
import { LineChartComponent } from "./components/dashboard/chart-components/line-chart/line-chart.component";
import { DonutComponent } from "./components/dashboard/chart-components/donut/donut.component";
import { BarChartComponent } from "./components/dashboard/chart-components/bar-chart/bar-chart.component";
import { PlyrModule } from "ngx-plyr";
import { CardSnippetModule } from "../../@core/components/card-snippet/card-snippet.module";
import { ConnectionHeaderComponent } from "./components/connection/connection-start/connection-header/connection-header.component";
import { EventPresenter } from "app/sport-pip-capture/components/event/event.presenter";
import { EventComponent } from "./components/event/event.component";
import { CreateOnDemandEventPresenter } from "./components/event/create-on-demand-event-form/create-on-demand-event.presenter";
import { TimeFormatPipe } from "./pipes/time-formate.pipe";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ValidationAlertComponent } from "./components/validation-alert/validation-alert.component";
import { MetaTypeComponent } from "./components/meta-type/meta-type.component";
import { TypesPresenter } from "app/sport-pip/components/types/types.presenter";
import { TypesComponent } from "app/sport-pip/components/types/types.component";
import { FormHostDirective } from "./blocks/inline-modal/form-host.directive";
import { FormHostComponent } from "./blocks/inline-modal/form-host/form-host.component";
import { InlineModalComponent } from "./blocks/inline-modal/inline-modal.component";
import { MetaTypePresenter } from "./components/meta-type/meta-type.presenter";
import { EventHeaderPresenter } from "./components/event/event-header/event-header.presenter";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ShareToPeopleComponent } from "./components/event/grid-view-ui/past-event/share-event/component/share-to-people/share-to-people.component";
import { ShareToSocialComponent } from "./components/event/grid-view-ui/past-event/share-event/component/share-to-social/share-to-social.component";
import { EventPreviewComponent } from "./components/event/grid-view-ui/up-coming-event/components/event-preview/event-preview.component";
import { ActiveDevicesComponent } from "./components/event/grid-view-ui/up-coming-event/components/event-preview/active-devices/active-devices.component";
import { PastEventViewComponent } from "./components/event/grid-view-ui/past-event/past-event-view/past-event-view.component";
import { PastEventViewPresenter } from "./components/event/grid-view-ui/past-event/past-event-view/past-event-view.presenter";
import { ShareEventComponent } from "./components/event/grid-view-ui/past-event/share-event/share-event.component";
import { OnGoingEventComponent } from "./components/event/grid-view-ui/on-going-event/on-going-event.component";
import { UpComingEventComponent } from "./components/event/grid-view-ui/up-coming-event/up-coming-event.component";
import { PastEventComponent } from "./components/event/grid-view-ui/past-event/past-event.component";
import { OngoingEventListComponent } from "./components/event/list-view-ui/ongoing-event-list/ongoing-event-list.component";
import { UpcomingEventsListComponent } from "./components/event/list-view-ui/upcoming-events-list/upcoming-events-list.component";
import { PastEventsListComponent } from "./components/event/list-view-ui/past-events-list/past-events-list.component";
import { MenuButtonComponent } from "./components/event/event-utility/menu-button/menu-button.component";
import { EventPaginationComponent } from "./components/event-pagination/event-pagination.component";
import { DemoMosaicModule } from "./mosaic.module";
import { EventPreviewPresenter } from "./components/event/grid-view-ui/up-coming-event/components/event-preview/event-preview.presenter";
import { VideoStreamingComponent } from "./blocks/video-streaming/video-streaming.component";
import { SchedualEventDetailPresenter } from "./components/event/events-detail/schedual-event-detail/schedual-event-detail.presenter";
import { SchedualEventDetailComponent } from "./components/event/events-detail/schedual-event-detail/schedual-event-detail.component";
import { OndemandEventDetailComponent } from "./components/event/events-detail/ondemand-event-detail/ondemand-event-detail.component";
import { OndemandEventDetailPresenter } from "./components/event/events-detail/ondemand-event-detail/ondemand-event-detail.presenter";
import { NouisliderModule } from "ng2-nouislider";
import { ConnectioGridListHeaderComponent } from "./components/connection/connection-start/connection-grid-list-header/connectio-grid-list-header.component";
import { ConnectionGridComponent } from "./components/connection/connection-start/connection-grid/connection-grid.component";
import { ConnectionListComponent } from "./components/connection/connection-start/connection-list/connection-list.component";
import { NgCircleProgressModule } from "ng-circle-progress";
import { DragulaModule } from "ng2-dragula";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};
@NgModule({
  declarations: [
    TimeFormatPipe,
    SportPipCaptureComponent,
    CaptureDashboardComponent,
    CaptureDashboardPresenter,
    OnGoingEventComponent,
    UpComingEventComponent,
    PastEventComponent,
    TruncateWordsPipe,
    EventHeaderComponent,
    ConnectionComponent,
    ConnectionPresenter,
    PreviousEventsConnectionComponent,
    ConnectionStartComponent,
    DevicesConnectingComponent,
    CreateOnDemandEventComponent,
    EventConnectionDetailComponent,
    ConnectionCardComponent,
    ConnectionDeviceDetailComponent,
    LogComponent,
    LogPresentert,
    SharedComponent,
    SharedPresenter,
    OngoingComponent,
    UpcomingComponent,
    PastComponent,
    LineChartComponent,
    DonutComponent,
    BarChartComponent,
    PastEventViewComponent,
    PastEventViewPresenter,
    ShareEventComponent,
    ShareToPeopleComponent,
    ShareToSocialComponent,
    ConnectionHeaderComponent,
    EventPresenter,
    EventComponent,
    CreateOnDemandEventPresenter,
    ValidationAlertComponent,
    MetaTypeComponent,
    TypesPresenter,
    TypesComponent,
    FormHostDirective,
    FormHostComponent,
    InlineModalComponent,
    MetaTypePresenter,
    EventHeaderPresenter,
    EventPreviewComponent,
    ActiveDevicesComponent,
    OngoingEventListComponent,
    UpcomingEventsListComponent,
    PastEventsListComponent,
    MenuButtonComponent,
    EventPaginationComponent,
    EventPreviewPresenter,
    VideoStreamingComponent,
    SchedualEventDetailComponent,
    SchedualEventDetailPresenter,
    OndemandEventDetailComponent,
    OndemandEventDetailPresenter,
    ConnectioGridListHeaderComponent,
    ConnectionListComponent,
    ConnectionGridComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  imports: [
    NouisliderModule,
    CommonModule,
    SportPipCaptureRoutingModule,
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule,
    ChartsModule,
    NgxDatatableModule,
    FormsModule,
    NgSelectModule,
    CoreSidebarModule,
    PlyrModule,
    CardSnippetModule,
    SweetAlert2Module.forRoot(),
    DemoMosaicModule,
    NgCircleProgressModule.forRoot(),
    DragulaModule.forRoot(),
  ],
})
export class SportPipCaptureModule {}
