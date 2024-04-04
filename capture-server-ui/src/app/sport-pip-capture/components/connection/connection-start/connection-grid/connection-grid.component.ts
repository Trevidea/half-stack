import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-connection-grid",
  templateUrl: "./connection-grid.component.html",
  styleUrls: ["./connection-grid.component.scss"],
})
export class ConnectionGridComponent implements OnInit {
  @Input() eventConnection: any;
  constructor() {}

  ngOnInit(): void {}
}
