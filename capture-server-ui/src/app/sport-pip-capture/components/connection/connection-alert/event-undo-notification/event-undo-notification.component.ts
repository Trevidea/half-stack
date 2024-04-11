import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-event-undo-notification",
  templateUrl: "./event-undo-notification.component.html",
  styleUrls: ["./event-undo-notification.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventUndoNotificationComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  close() {
    this.modalService.dismissAll();
  }
}
