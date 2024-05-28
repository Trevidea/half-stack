import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "environments/environment";
import { OvenMediaServerFormPresenter } from "./oven-media-server-form/oven-media-server-from.Presenter";
import { RelayStreamPresenter } from "./relay-stream/relay-stream.presenter";
import { Location } from '@angular/common';
@Component({
  selector: "app-connection-device-detail",
  templateUrl: "./connection-device-detail.component.html",
  styleUrls: ["./connection-device-detail.component.scss"],
  encapsulation:ViewEncapsulation.None
})
export class ConnectionDeviceDetailComponent implements OnInit {
  @Input() datasource: any
  // url = `${environment.playerUrl}/shreyaapp/11/llhls.m3u8?pin=stream1`;
  url: string;
  deviceDetails: any
  constructor(
    private location: Location,
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

  goBack() {
    this.location.back();
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

  
  }
}
