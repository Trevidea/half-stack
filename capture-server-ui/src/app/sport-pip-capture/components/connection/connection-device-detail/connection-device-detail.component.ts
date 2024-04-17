import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "environments/environment";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  // url = "assets/videos/2/output.m3u8";
  url = `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`;
  constructor(private router: Router, private route: ActivatedRoute) {}
  listOrGrid: string;
  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("listOrGrid")) {
      const listOrGrid = param.get("listOrGrid");
      console.log(listOrGrid);
      this.listOrGrid = listOrGrid;
    }
  }

  back() {
    this.router.navigate(["connection"], {
      queryParams: { listOrGrid: `${this.listOrGrid}` },
    });
  }
}
