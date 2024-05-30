import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import Swal from "sweetalert2";
import { PreviousEventsConnection } from "./connection-data";
import { EventRunnerService } from "../event-runner/event-runner.service";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionComponent implements OnInit {
  @Input() datasource: any;
  isEventStarted: boolean;
  previousEventsConnection: any;
  header: string[];
  
  constructor(private router: Router, private eventRunnerService: EventRunnerService,) {
    this.previousEventsConnection = PreviousEventsConnection;
    this.eventRunnerService.isEventStarted$.subscribe(
      (res) => {
        console.log(res);
        this.isEventStarted = res;
      }
    );
  }

  ngOnInit(): void {

  }

}
