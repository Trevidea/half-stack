import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportPipPresenter } from './sport-pip.presenter';
import { HomePresenter } from './components/home/home.presenter';
import { EventPresenter } from './components/event/events.presenter';
import { TeamPresenter } from './components/team/team.presenter';
import { CoachPresenter } from './components/coach/coach.presenter';
import { PlayerPresenter } from './components/player/player.presenter';
import { RosterPresenter } from './components/roster/roster.presenter';
import { MediaPresenter } from './components/media/media.presenter';
import { AnalysisPresenter } from './components/analysis/analysis.presenter';
import { SetupPresenter } from './components/setup/setup.presenter';
import { NotificationPresenter } from './components/notification/notification.presenter';
import { TaggingPresenter } from './components/tagging/tagging.presenter';
import { SettingPresenter } from './components/setting/setting.presenter';

const routes: Routes = [
  { path: 'home', component: HomePresenter },
 
  // {
  //   path: '', component: SportPipPresenter,
  //   children: [
  //     { path: 'home', component: HomePresenter },
  //   ]
  // },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'event', component: EventPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'team', component: TeamPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'coaches', component: CoachPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'player', component: PlayerPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'roster', component: RosterPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'media', component: MediaPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'analysis', component: AnalysisPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'tagging', component: TaggingPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'setup', component: SetupPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'notification', component: NotificationPresenter }
    ]
  },
  {
    path: '', component: SportPipPresenter,
    children: [
      { path: 'settings', component: SettingPresenter }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportPipRoutingModule { }
