import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-oven-media-server-form",
  templateUrl: "./oven-media-server-form.component.html",
  styleUrls: ["./oven-media-server-form.component.scss"],
})
export class OvenMediaServerFormComponent implements OnInit {
  @Input() datasource: any;
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}
  ngOnInit(): void {}
}
