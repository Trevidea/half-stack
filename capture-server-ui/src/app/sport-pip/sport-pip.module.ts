import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportPipRoutingModule } from './sport-pip-routing.module';
import { SportPipComponent } from './sport-pip.component';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipHeaderComponent } from './components/pip-header/pip-header.component';
import { SportPipPresenter } from './sport-pip.presenter';
import { HomeComponent } from './components/home/home.component';

import { TeamComponent } from './components/team/team.component';
import { CoachComponent } from './components/coach/coach.component';
import { RosterComponent } from './components/roster/roster.component';
import { MediaComponent } from './components/media/media.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SetupComponent } from './components/setup/setup.component';
import { SupportComponent } from './components/support/support.component';
import { HomePresenter } from './components/home/home.presenter';

import { TeamPresenter } from './components/team/team.presenter';
import { CoachPresenter } from './components/coach/coach.presenter';
import { PlayerComponent } from './components/player/player.component';
import { PlayerPresenter } from './components/player/player.presenter';
import { RosterPresenter } from './components/roster/roster.presenter';
import { MediaPresenter } from './components/media/media.presenter';
import { AnalysisPresenter } from './components/analysis/analysis.presenter';
import { SetupPresenter } from './components/setup/setup.presenter';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationPresenter } from './components/notification/notification.presenter';
import { TaggingComponent } from './components/tagging/tagging.component';
import { TaggingPresenter } from './components/tagging/tagging.presenter';
import { SettingComponent } from './components/setting/setting.component';
import { SettingPresenter } from './components/setting/setting.presenter';
import { ChartsModule } from 'ng2-charts';
import { EventsPresenter } from './components/event/events.presenter';
import { EventsComponent } from './components/event/events.component';
import { TestingDDirective } from './components/testing-d.directive';


@NgModule({
  declarations: [
    SportPipComponent,
    PipHeaderComponent,
    SportPipPresenter,
    HomeComponent,
    TeamComponent,
    CoachComponent,
    RosterComponent,
    MediaComponent,
    AnalysisComponent,
    ActivityComponent,
    SetupComponent,
    SupportComponent,
    HomePresenter,
    
    TeamPresenter,
    CoachPresenter,
    PlayerComponent,
    PlayerPresenter,
    RosterPresenter,
    MediaPresenter,
    AnalysisPresenter,
    SetupPresenter,
    NotificationComponent,
    NotificationPresenter,
    TaggingComponent,
    TaggingPresenter,
    SettingComponent,
    SettingPresenter,EventsPresenter,EventsComponent, TestingDDirective
  ],
  imports: [
    CommonModule,
    SportPipRoutingModule,
    CommonModule,
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    InvoiceModule,
    ChartsModule,

  ]
})
export class SportPipModule { }
