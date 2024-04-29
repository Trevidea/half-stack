import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Observable, Subject, Subscription } from "rxjs";
import { ConnectionAlertComponent } from "../../connection-alert/connection-alert.component";
import { EventUndoNotificationComponent } from "../../connection-alert/event-undo-notification/event-undo-notification.component";
import { Timer } from "../../timer";
import { TimerService } from "../../timer.service";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";

@Component({
  selector: "app-connection-header",
  templateUrl: "./connection-header.component.html",
  styleUrls: ["./connection-header.component.scss"],
  providers: [NgbActiveModal],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionHeaderComponent implements OnInit {
  connectiondetail: boolean = false;
  undoEvent: boolean = false;
  @Input() datasource: any;
  currentTime: string;
  isTimerRunning = false;

  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService,
    private modelService: NgbModal,
    public timerService: Timer,
    private service: ModelServiceService
  ) {}
  formattedTime: string = "00:00:00";
  ngOnInit(): void {
    this.timerService.getElapsedTime().subscribe((data) => {
      this.formattedTime = data;
    });
  }

  ngOnDestroy() {}

  closeDetail() {
    this.connectiondetail = false;
  }

  playPauseEvent(e: string) {
    if (e == "play") {
      this.undoEvent = false;
    } else {
      const modelRef = this.modelService.open(EventUndoNotificationComponent, {
        centered: false,
        size: "sm",
        windowClass: "event-notification-undo",
      });
      this.undoEvent = true;
      modelRef.componentInstance;
      modelRef.componentInstance.undoEvent = true;
      modelRef.componentInstance.updateEventStatus.subscribe(
        (receivedEntry) => {
          this.undoEvent = receivedEntry;
          if (this.undoEvent == false) {
            this.timerService.resume();
          }
        }
      );
    }
  }
  modalOpenSM(modalblock) {
    const modeldata = this.modelService.open(ConnectionAlertComponent, {
      centered: true,
      size: "sm",
    });

    modeldata.componentInstance.undoEvent = false;
    modeldata.componentInstance.title = "End Event";
    modeldata.componentInstance.description =
      "Are you sure you want to end the <br> event ?";
    this.route.queryParams.subscribe((params) => {
      modeldata.componentInstance.eventId = params["eventId"];
    });
    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
      // this.undoEvent = receivedEntry;
      // this.service.closePreview({eventId: })
    });
  }
}
