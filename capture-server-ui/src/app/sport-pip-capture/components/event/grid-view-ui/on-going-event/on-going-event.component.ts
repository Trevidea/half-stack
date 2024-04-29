import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription, interval } from "rxjs";
import { DateTimeService } from "../../event-utility/date-time.service";
import { UI } from "../../event-utility/event-ui-interface";
import { Router } from "@angular/router";
@Component({
  selector: "app-on-going-event",
  templateUrl: "./on-going-event.component.html",
  styleUrls: ["./on-going-event.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit, OnDestroy, OnChanges {
  startIndex: number;
  eventId: number;
  opOngoingDetail: boolean = false;
  @Input() datasource: any;
  private countdownInterval: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    {
      label: "Edit Event",
      icon: "edit",
      type: "feather",
      action: () => this.editOnDemandEvent(),
    },
    { label: "Remove Event", icon: "trash", type: "feather", action: () => {} },
  ];
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private dateTimeservice: DateTimeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasource && changes.datasource.currentValue) {
      this.dateTimeservice.updateCountdownForOngoingEvents(this.datasource);
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.countdownInterval = setInterval(() => {
        this.dateTimeservice.updateCountdownForOngoingEvents(this.datasource);
      }, 50);
    }
  }

  openDetailView(key: string, index: number) {
    this.startIndex = index;
    this.opOngoingDetail = true;
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  OnClosedDetailView(data: any) {
    this.opOngoingDetail = false;
  }

  clickedmenu(id: number) {
    this.eventId = id;
  }

  editOnDemandEvent() {
    this.router.navigate(["/on-demand-event"], {
      queryParams: { id: this.eventId },
    });
  }

  deleteEvent() {}

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
