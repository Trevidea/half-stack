import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "environments/environment";
import { RelayStreamComponent } from "./relay-stream/relay-stream.component";
import { OvenMediaServerFormComponent } from "./oven-media-server-form/oven-media-server-form.component";
import { OvenMediaServerFormPresenter } from "./oven-media-server-form/oven-media-server-from.Presenter";
import { RelayStreamPresenter } from "./relay-stream/relay-stream.presenter";
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailComponent implements OnInit {
  @Input() datasource: any;
  // url = "assets/videos/2/output.m3u8";
  url = `https://drake.in:3334/shreyaapp/11/llhls.m3u8?pin=stream1`;
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
      modal = OvenMediaServerFormPresenter;
      // OvenMediaServerFormComponent;
    } else {
      modal = RelayStreamPresenter;
      //  RelayStreamComponent;
    }

    // const modeldata = this.modelService.open(modal, {
    //   centered: true,
    //   size: "md",
    // });
    // modeldata.componentInstance.eventId = this.datasource.eventId;
    // this.ds.location.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
    //   e.modal.component = TypesPresenter;
    //   e.modal.properties["key"] = "LOCATION";
    //   try {
    //     const data = await e.modal.open();
    //     if (data) {
    //       Transformer.ComposeAndSelect(this.ds.location, data.newItem);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  }
}
