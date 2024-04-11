import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventUndoNotificationComponent } from "./event-undo-notification/event-undo-notification.component";

@Component({
  selector: "app-connection-alert",
  templateUrl: "./connection-alert.component.html",
  styleUrls: ["./connection-alert.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionAlertComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  undoEvent: boolean = true;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  close() {
    this.modalService.dismissAll();
    if (this.title == "End Event") {
      const undoNotification = this.modalService.open(
        EventUndoNotificationComponent,
        {
          centered: false,
          size: "sm",
          windowClass: "event-notification-undo",
        }
      );
      undoNotification.componentInstance.undoEvent = false;

      undoNotification.result.then(
        (selectedItems) => {
          this.undoEvent = selectedItems;
          console.log("Parent :::", this.undoEvent, selectedItems);
        },
        (reason) => {}
      );
    }
  }
}
/*
 const modalRef = this.modalService.open(FormListModalComponent, {
      size: "lg",
    });

    modalRef.componentInstance.items = this.peoples;
    modalRef.componentInstance.type = "Peoples";

    modalRef.result.then(
      (selectedItems) => {
        this.datasource.peoples = selectedItems;
      },
      (reason) => {}
    );
*/
