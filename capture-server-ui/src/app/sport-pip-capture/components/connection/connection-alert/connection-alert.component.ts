import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-connection-alert",
  templateUrl: "./connection-alert.component.html",
  styleUrls: ["./connection-alert.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionAlertComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  close() {
    this.modalService.dismissAll();
  }
}
