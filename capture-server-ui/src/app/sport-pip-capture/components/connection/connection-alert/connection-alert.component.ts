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
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log("connection alert component ::", this.undoEvent);
  }

  close() {
    if (this.title == "End Event") {
      this.undoEvent = true;
      this.passEntry.emit(this.undoEvent);
      this.modalService.dismissAll();

      const undoNotification = this.modalService.open(
        EventUndoNotificationComponent,
        {
          centered: false,
          size: "sm",
          windowClass: "event-notification-undo",
        }
      );
      undoNotification.componentInstance.undoEvent = this.undoEvent;

      undoNotification.result.then(
        (selectedItems) => {
          this.undoEvent = selectedItems;
          console.log("Parent :::", this.undoEvent, selectedItems);
          this.passEntry.emit(this.undoEvent);
        },
        (reason) => {}
      );
    } else {
      this.modalService.dismissAll();
    }
  }
}
