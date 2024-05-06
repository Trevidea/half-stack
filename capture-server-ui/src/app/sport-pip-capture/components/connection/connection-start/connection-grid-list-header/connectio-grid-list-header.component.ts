import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddDevicePresenter } from "app/sport-pip-capture/components/add-device/add-device.presenter";

@Component({
  selector: "app-connectio-grid-list-header",
  templateUrl: "./connectio-grid-list-header.component.html",
  styleUrls: ["./connectio-grid-list-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectioGridListHeaderComponent implements OnInit {
  @Output() messageListOrGrid = new EventEmitter<string>();
  @Output() pubSubAll = new EventEmitter<string>();
  @Input() eventId: number = 34;
  allOrSubOrPub: string = "all";
  listOrGrid: string = "list";

  constructor(private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("listOrGrid")) {
      const listOrGrid = param.get("listOrGrid");
      this.listOrGrid = listOrGrid;
      this.listGrid(listOrGrid);
    }
  }
  listGrid(e: string) {
    this.messageListOrGrid.emit(e);
    this.listOrGrid = e;
  }
  getAllPubOrSub(e) {
    this.allOrSubOrPub = e;
    this.pubSubAll.emit(e);
  }

  openAddDeviceModal() {
    const modalRef = this.modalService.open(AddDevicePresenter, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.eventId = this.eventId;
  }
}
