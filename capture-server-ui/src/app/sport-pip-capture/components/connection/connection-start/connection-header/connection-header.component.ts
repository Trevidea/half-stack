import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Subject, Subscription } from "rxjs";
import { ConnectionAlertComponent } from "../../connection-alert/connection-alert.component";
import { EventUndoNotificationComponent } from "../../connection-alert/event-undo-notification/event-undo-notification.component";
import { TimerService } from "../../timer.service";
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

  currentTime: string;
  isTimerRunning = false;
  private timerSubscription: Subscription;
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService,
    private modelService: NgbModal,
    private timerService: TimerService
  ) {
    this.timerSubscription = this.timerService.getTime().subscribe((time) => {
      this.currentTime = time;
    });
  }
  startTimer(e?: any) {
    this.isTimerRunning = true;
    this.timerService.startTimer(e);
  }
  pauseTimer() {
    this.timerService.pauseTimer();
  }
  stopTimer() {
    this.isTimerRunning = false;
  }

  resetTimer() {
    this.timerService.resetTimer();
    this.isTimerRunning = false;
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.startTimer();
  }

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
          console.log("received", receivedEntry);
          this.undoEvent = receivedEntry;
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

    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log("received", receivedEntry);
      this.undoEvent = receivedEntry;
    });
  }
}
