import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-event-end-notifictions",
  templateUrl: "./event-end-notifictions.component.html",
  styleUrls: ["./event-end-notifictions.component.scss"],
})
export class EventEndNotifictionsComponent implements OnInit {
  @Input() eventDetail = {
    eventName: "McQuaid vs Fairport",
    eventType: "Football",
    duration: "2hr 32mn",
    size: "200",
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
