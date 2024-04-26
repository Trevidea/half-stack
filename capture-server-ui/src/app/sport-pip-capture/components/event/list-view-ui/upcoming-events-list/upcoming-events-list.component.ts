import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Router } from '@angular/router';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';

@Component({
  selector: 'app-upcoming-events-list',
  templateUrl: './upcoming-events-list.component.html',
  styleUrls: ['./upcoming-events-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpcomingEventsListComponent implements OnInit {
  @Input() datasource: any;
  startIndex: number;
  openDetailmodel: boolean;
  eventId: number;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Edit Event', icon: 'edit', type: 'feather', action: () => this.editOnDemandEvent() },
    { label: 'Share Event', icon: 'share', type: 'feather', action: () => { } },
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => this.deleteEvent() },
  ]
  constructor(private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private Modelservice: ModelServiceService,
    public dateTimeservice: DateTimeService) { }

  ngOnInit(): void {
  }

  openDetailView(key: string, index: number) {
    this.startIndex = index
    this.openDetailmodel = true
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  OnClosedDetail(data: any) {
    this.openDetailmodel = false
  }


  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'],
      {
        queryParams: { id: this.eventId },
      }
    )
  }

  deleteEvent() {
    this.Modelservice.delete('event', this.eventId);
  }

  clickedmenu(id: number) {
    console.log("pare", id)
    this.eventId = id;
  }
}
