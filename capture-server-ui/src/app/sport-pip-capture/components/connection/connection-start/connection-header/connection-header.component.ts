import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Subject } from "rxjs";
import { ConnectionAlertComponent } from "../../connection-alert/connection-alert.component";
@Component({
  selector: "app-connection-header",
  templateUrl: "./connection-header.component.html",
  styleUrls: ["./connection-header.component.scss"],
  providers: [NgbActiveModal],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionHeaderComponent implements OnInit {
  _gridView: boolean = false;
  _ListView: boolean = true;
  connectiondetail: boolean = false;
  undoEvent: boolean = false;

  private socket: any;
  private subject: Subject<string> = new Subject<string>();
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService,
    private modelService: NgbModal
  ) {}
  messages: string[] = [];
  ngOnInit(): void {}

  closeDetail() {
    this.connectiondetail = false;
  }

  gridView() {
    this._gridView = true;
    this._ListView = false;
    this.router.navigate(["connection/connection-card-view"]);
  }
  listView() {
    this._gridView = false;
    this._ListView = true;
    this.router.navigate(["connection"]);
  }

  modalOpenSM(modalblock) {
    const modeldata = this.modelService.open(ConnectionAlertComponent, {
      centered: true,
      size: "sm",
    });

    modeldata.componentInstance.undoEvent = false;
    modeldata.componentInstance.title = "End Event";
    modeldata.componentInstance.description =
      "Are you sure you want to end the <br> event ?";

    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log("received", receivedEntry);
      this.undoEvent = receivedEntry;
    });
  }
}
