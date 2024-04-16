import { Component, OnInit } from "@angular/core";
import { environment } from "environments/environment";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  url = "assets/videos/2/output.m3u8";
  // url = `${environment.spHLSUrl}/spip_school_stream/ind_vs_pak/llhls.m3u8`;
  constructor() {}

  ngOnInit(): void {}
}
