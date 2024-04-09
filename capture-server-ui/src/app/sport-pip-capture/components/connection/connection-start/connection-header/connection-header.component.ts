import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

import { Subject } from "rxjs";
@Component({
  selector: "app-connection-header",
  templateUrl: "./connection-header.component.html",
  styleUrls: ["./connection-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionHeaderComponent implements OnInit {
  _gridView: boolean = false;
  _ListView: boolean = true;
  connectiondetail: boolean = false;
  private socket: any;
  private subject: Subject<string> = new Subject<string>();
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService
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
}
