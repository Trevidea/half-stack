import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UI } from "../../event-utility/event-ui-interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-past-event",
  templateUrl: "./past-event.component.html",
  styleUrls: ["./past-event.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PastEventComponent implements OnInit {
  @Input() datasource: any;
  @Output() onDeleteEvent = new EventEmitter();
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  eventId: number;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: "Edit {t}", icon: "edit", type: "feather", action: () => this.editOnDemandEvent() },
    { label: "Share Event", icon: "share", type: "feather", action: () => { } },
    {
      label: "Upload to server",
      icon: "upload-cloud",
      type: "feather",
      action: () => { },
    },
    { label: "Remove Event", icon: "trash", type: "feather", action: () => this.deleteEvent() },
  ];
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void { }
  eventShareModalOpen(eventShareModal) {
    this.modalService.open(eventShareModal, {
      centered: true,
      size: "lg",
    });
  }
  formatDateTime(dateTimeString: string, time: number): string {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const timeHours = Math.floor(time / 100);
    const timeMinutes = time % 100;
    const amPm = timeHours >= 12 ? "pm" : "am";
    const formattedHours = timeHours % 12 || 12;
    const formattedMinutes = timeMinutes < 10 ? "0" + timeMinutes : timeMinutes;
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    return `${formattedDate}, ${formattedHours}:${formattedMinutes} ${amPm}`;
  }

  onMenuclk(eventId: number) {
    this.eventId = eventId
  }

  editOnDemandEvent() {
    this.router.navigate(["/on-demand-event"], {
      queryParams: { id: this.eventId },
    });
  }

  deleteEvent() {
    this.onDeleteEvent.emit(this.eventId)
  }


}
