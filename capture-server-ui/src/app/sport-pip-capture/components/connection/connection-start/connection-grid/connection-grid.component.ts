import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-connection-grid",
  templateUrl: "./connection-grid.component.html",
  styleUrls: ["./connection-grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionGridComponent implements OnInit {
  @Input() eventConnection: any;
  constructor() {}

  ngOnInit(): void {}
}
