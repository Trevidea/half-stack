import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

@Component({
  selector: "app-connection-header",
  templateUrl: "./connection-header.component.html",
  styleUrls: ["./connection-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionHeaderComponent implements OnInit {
  _gridView: boolean = false;
  _ListView: boolean = true;
  message: string;
  connectiondetail: boolean = false;
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute,
    private webSocketService: DataFactoryService
  ) {}

  ngOnInit(): void {
    this.webSocketService.getMessage().subscribe(
      (message) => {
        console.log("Received message:", message);
        // Handle the received message as needed
      },
      (error) => {
        console.error("Error:", error);
        // Handle errors if any
      }
    );
  }
  sendMessage() {
    this.webSocketService.sendMessage("Hello from Angular!");
  }
  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes;
  }
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
