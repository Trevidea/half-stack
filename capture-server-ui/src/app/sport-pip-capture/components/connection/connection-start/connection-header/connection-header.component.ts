import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Observable, Subject, Subscription } from "rxjs";
import { ConnectionAlertComponent } from "../../connection-alert/connection-alert.component";
import { EventUndoNotificationComponent } from "../../connection-alert/event-undo-notification/event-undo-notification.component";
import { Timer } from "../../timer.service";
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
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService,
    private modelService: NgbModal
  ) {
    this.timer = new Timer();
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
          console.log("received", receivedEntry);
          this.undoEvent = receivedEntry;
          if (this.undoEvent == false) {
            this.resumeTimer();
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

    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log("received", receivedEntry);
      this.undoEvent = receivedEntry;
    });
  }

  timer = new Timer();
  elapsedTime$: Observable<string>;

  ngOnInit() {
    this.timer.start();
    this.elapsedTime$ = this.timer.getElapsedTime();
  }

  startTimer() {
    this.timer.start();
    this.elapsedTime$ = this.timer.getElapsedTime();
  }

  stopTimer() {
    this.timer.stop();
    this.elapsedTime$ = this.timer.getElapsedTime();
  }

  pauseTimer() {
    this.timer.pause();
  }

  resumeTimer() {
    this.timer.resume();
  }
}
