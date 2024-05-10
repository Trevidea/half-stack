import { Component, EventEmitter, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { OvenMediaServerView } from "./views/oven-media-server";
@Component({
  selector: "app-oven-media-server-form-presenter",
  template: `<app-oven-media-server-form
    [datasource]="ds"
  ></app-oven-media-server-form>`,
  styleUrls: ["./oven-media-server-form.component.scss"],
  providers: [NgbActiveModal],
})
export class OvenMediaServerFormPresenter implements OnInit, Views.FormModal {
  ds: OvenMediaServerView;
  actions: Views.FormActions;
  @Input() eventId: any;
  setModalActions(onClose: EventEmitter<any>): void {}
  constructor() {
    this.ds = new OvenMediaServerView();
  }
  ngOnInit(): void {
    // console.log(
    //   "Oven Media Server Form Presenter eventID::",
    //   this.eventId,
    //   this.ds.name
    // );
  }
}
