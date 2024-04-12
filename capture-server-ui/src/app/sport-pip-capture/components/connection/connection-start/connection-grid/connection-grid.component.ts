import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-connection-grid",
  templateUrl: "./connection-grid.component.html",
  styleUrls: ["./connection-grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionGridComponent implements OnInit {
  @Input() eventConnection: any;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: "sm", // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
}
