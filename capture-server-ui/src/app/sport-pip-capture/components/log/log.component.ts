import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogComponent implements OnInit {
  @Input() datasource: any;
  @Input() users: any;
  @Input() categories: any;
  constructor() {}

  ngOnInit(): void {}
  arrowDirection: number = 0; // 0 for down, 180 for up

  toggleArrow() {
    this.arrowDirection = this.arrowDirection === 0 ? 180 : 0;
  }
}
