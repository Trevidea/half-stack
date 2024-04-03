import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-event-preview-presenter",
  template: "<app-event-preview></app-event-preview>",
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
