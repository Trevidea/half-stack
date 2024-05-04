import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-oven-media-server-form",
  templateUrl: "./oven-media-server-form.component.html",
  styleUrls: ["./oven-media-server-form.component.scss"],
})
export class OvenMediaServerFormComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
}
