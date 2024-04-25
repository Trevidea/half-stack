import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddDeviceComponent } from "app/sport-pip-capture/components/add-device/add-device.component";

@Component({
  selector: "app-connectio-grid-list-header",
  templateUrl: "./connectio-grid-list-header.component.html",
  styleUrls: ["./connectio-grid-list-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectioGridListHeaderComponent implements OnInit {
  @Output() messageListOrGrid = new EventEmitter<string>();
  @Output() pubSubAll = new EventEmitter<string>();

  allOrSubOrPub: string = "all";
  listOrGrid: string = "list";

  constructor(private modalService: NgbModal, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("listOrGrid")) {
      const listOrGrid = param.get("listOrGrid");
      console.log(listOrGrid);
      this.listOrGrid = listOrGrid;
      this.listGrid(listOrGrid);
    }
    console.log("abc::", this.listOrGrid);
  }
  listGrid(e: string) {
    this.messageListOrGrid.emit(e);
    this.listOrGrid = e;
  }
  getAllPubOrSub(e) {
    this.allOrSubOrPub = e;
    this.pubSubAll.emit(e);
  }
  modalOpenForm(modalForm) {
    this.modalService.open(AddDeviceComponent, {
      centered: true,
    });
  }
}
