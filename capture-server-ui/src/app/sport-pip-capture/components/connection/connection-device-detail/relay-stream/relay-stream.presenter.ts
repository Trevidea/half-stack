import { Component, EventEmitter, Input, OnInit } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Views } from "app/sport-pip-capture/models/capture-interface";
@Component({
  selector: "app-relay-stream-presenter",
  template: `<app-relay-stream></app-relay-stream>`,
  styleUrls: ["./relay-stream.component.scss"],
  providers: [NgbActiveModal],
})
export class RelayStreamPresenter implements OnInit, Views.FormModal {
  actions: Views.FormActions;
  setModalActions(onClose: EventEmitter<any>): void {}
  @Input() eventId: any;
  ngOnInit(): void {
    console.log("Relay Presenter eventID::", this.eventId);
  }
}
