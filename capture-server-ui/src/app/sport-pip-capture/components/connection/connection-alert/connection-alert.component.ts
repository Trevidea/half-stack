import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventUndoNotificationComponent } from "./event-undo-notification/event-undo-notification.component";
import { EventEndNotifictionsComponent } from "../../event-notifications/event-end-notifictions/event-end-notifictions.component";
import { SocketService } from "app/sport-pip-capture/models/socket.service";

@Component({
  selector: "app-connection-alert",
  templateUrl: "./connection-alert.component.html",
  styleUrls: ["./connection-alert.component.scss"],
  providers: [NgbActiveModal],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionAlertComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() undoEvent: boolean;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    console.log("connection alert component ::", this.undoEvent);
  }
  close() {
    this.modalService.dismissAll();
  }
  YesSure() { 
    if (this.title == "End Event") {
      
      this.modalService.dismissAll();
     
      const undoNotification = this.modalService.open(
        EventEndNotifictionsComponent,
        {
          centered: true,
          size: "md",
        }
      );
      undoNotification.componentInstance.eventDetail = {
        eventName: "CSK vs MI",
        eventType: "Cricket",
        duration: "5hr 32mn",
        size: "700",
      };
      undoNotification.componentInstance.undoEvent = this.undoEvent;

      undoNotification.result.then(
        (selectedItems) => {
          this.undoEvent = selectedItems;
          console.log("Parent :::", this.undoEvent, selectedItems);
          // this.passEntry.emit(this.undoEvent);
        },
        (reason) => {}
      );
    } else {
      this.modalService.dismissAll();
      this.passEntry.emit(true);
    }
  }
}
