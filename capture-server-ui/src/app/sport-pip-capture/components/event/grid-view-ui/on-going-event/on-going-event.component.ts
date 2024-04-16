import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Subscription, interval } from 'rxjs';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit, OnDestroy {
  startIndex: number;
  eventId:number;
  opOngoingDetail: boolean = false;
  @Input() datasource: any
  private countdownInterval: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Edit Event', icon: 'edit', type: 'feather', action: () => this.editOnDemandEvent() },
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private _coreSidebarService: CoreSidebarService, 
    private dateTimeservice: DateTimeService,
     private router:Router
    ) { }


  ngOnInit(): void {
    // if (this.datasource) {
    //   this.dateTimeservice.calculateCountdown(this.datasource);
    //   this.countdownInterval = setInterval(() => {
    //     this.dateTimeservice.calculateCountdown(this.datasource);
    //   }, 1000);
    // }

  }

  eventDetail(event: string, index: number) {
    this.startIndex = index
    this.opOngoingDetail = true
    this._coreSidebarService.getSidebarRegistry('ongoing-' + event).toggleOpen();
  }

  OnClosedDetail(data: any) {
    console.log("core side bar closed")
    this.opOngoingDetail = false
  }

  clickedmenu(id: number) {
    console.log("yes menu clicked ", id)
    this.eventId = id;
  }

  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'],
      {
        queryParams: { id: this.eventId },
      }
    )
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

}
