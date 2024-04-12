import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-connection-list",
  templateUrl: "./connection-list.component.html",
  styleUrls: ["./connection-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [DragulaService],
})
export class ConnectionListComponent implements OnInit {
  @Input() eventConnection: any;
  constructor(
    private dragulaService: DragulaService,
    public modalService: NgbModal
  ) {
    dragulaService.createGroup("handle-list", {
      moves: function (el, container, handle) {
        return handle.classList.contains("handle");
      },
    });
  }

  ngOnInit(): void {}
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: "sm", // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
}
