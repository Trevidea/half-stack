import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-relay-stream",
  templateUrl: "./relay-stream.component.html",
  styleUrls: ["./relay-stream.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RelayStreamComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
}
