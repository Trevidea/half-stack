import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-connectio-grid-list-header",
  templateUrl: "./connectio-grid-list-header.component.html",
  styleUrls: ["./connectio-grid-list-header.component.scss"],
})
export class ConnectioGridListHeaderComponent implements OnInit {
  @Output() messageListOrGrid = new EventEmitter<string>();
  @Output() pubSubAll = new EventEmitter<string>();

  allOrSubOrPub: string = "all";
  listOrGrid: string = "list";

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  listGrid(e: string) {
    this.messageListOrGrid.emit(e);
    this.listOrGrid = e;
  }
  getAllPubOrSub(e) {
    this.allOrSubOrPub = e;
    console.log("clicked");
    this.pubSubAll.emit(e);
  }
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm, {
      centered: true,
    });
  }
}
