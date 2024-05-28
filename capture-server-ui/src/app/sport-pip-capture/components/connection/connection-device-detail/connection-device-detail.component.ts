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
  @Input() datasource: any
  // url = `${environment.playerUrl}/shreyaapp/11/llhls.m3u8?pin=stream1`;
  url: string;
  deviceDetails: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modelService: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {
      const devicedetail = JSON.parse(params['devicedetail']);
      this.deviceDetails = devicedetail
      console.log(devicedetail);
    });
  }
  listOrGrid: string;
  ngOnInit(): void {
    this.url = `${environment.playerUrl}/${this.deviceDetails._appName}/${this.deviceDetails._activeDeviceId}/llhls.m3u8?pin=${this.deviceDetails._pin}`;
    console.log(this.url);
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
