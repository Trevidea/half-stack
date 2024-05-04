import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "environments/environment";
import { RelayStreamComponent } from "./relay-stream/relay-stream.component";
import { OvenMediaServerFormComponent } from "./oven-media-server-form/oven-media-server-form.component";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  // url = "assets/videos/2/output.m3u8";
  url = `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: NgbModal
  ) {}
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

  modalOpen(modalblock: any) {
    var modal;
    if (modalblock == "mediaSetting") {
      modal = OvenMediaServerFormComponent;
    } else {
      modal = RelayStreamComponent;
    }

    const modeldata = this.modelService.open(modal, {
      centered: true,
      size: "md",
    });
  }
}
