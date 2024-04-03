import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  url = "assets/videos/2/output.m3u8";
  constructor() {}

  ngOnInit(): void {}
}
