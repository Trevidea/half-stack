import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
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
  constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup("handle-list", {
      moves: function (el, container, handle) {
        return handle.classList.contains("handle");
      },
    });
  }

  ngOnInit(): void {}
}
