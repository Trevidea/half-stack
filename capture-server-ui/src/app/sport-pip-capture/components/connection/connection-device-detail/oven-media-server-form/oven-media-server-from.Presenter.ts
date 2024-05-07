import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Views } from "app/sport-pip-capture/models/capture-interface";
@Component({
  selector: "app-oven-media-server-form-presenter",
  template: `<app-oven-media-server-form></app-oven-media-server-form>`,
  styleUrls: ["./oven-media-server-form.component.scss"],
  providers: [NgbActiveModal],
})
export class OvenMediaServerFormPresenter implements OnInit, Views.FormModal {
  actions: Views.FormActions;
  setModalActions(onClose: EventEmitter<any>): void {}
  @Input() eventId: any;
  ngOnInit(): void {
    console.log("Oven Media Server Form Presenter eventID::", this.eventId);
  }
}
