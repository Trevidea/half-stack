import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  url = "assets/videos/2/output.m3u8";
  // url = "http://drake.in:59919/spip_school_stream/ind_vs_pak/llhls.m3u8";
  constructor() {}

  ngOnInit(): void {}
}
