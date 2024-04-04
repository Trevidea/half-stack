import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-connection-list",
  templateUrl: "./connection-list.component.html",
  styleUrls: ["./connection-list.component.scss"],
})
export class ConnectionListComponent implements OnInit {
  @Input() eventConnection: any;
  constructor() {}

  ngOnInit(): void {}
}
