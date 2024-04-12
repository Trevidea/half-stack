import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-event-ended-modal",
  templateUrl: "./event-ended-modal.component.html",
  styleUrls: ["./event-ended-modal.component.scss"],
  providers: [NgbActiveModal],
  encapsulation: ViewEncapsulation.None,
})
export class EventEndedModalComponent implements OnInit {
  ngOnInit(): void {}
}
