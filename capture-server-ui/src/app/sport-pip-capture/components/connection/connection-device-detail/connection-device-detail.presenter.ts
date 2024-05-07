import { Component, OnInit } from "@angular/core";
import { ConnectionDeviceDetailView } from "./views/connection-device-detail";
import { Transformer } from "app/blocks/transformer";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { ConnectionDeviceDetailBuilder } from "./builders/connection-device-detail";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { OvenMediaServerFormPresenter } from "./oven-media-server-form/oven-media-server-from.Presenter";
import { RelayStreamPresenter } from "./relay-stream/relay-stream.presenter";

@Component({
  selector: "app-connection-device-detail-presenter",
  template: `<app-connection-device-detail
    [datasource]="ds"
  ></app-connection-device-detail>`,
  styleUrls: ["./connection-device-detail.component.scss"],
})
export class ConnectionDeviceDetailPresenter implements OnInit {
  ds: ConnectionDeviceDetailView;

  constructor(private modelServiceService: ModelServiceService) {
    this.ds = new ConnectionDeviceDetailView();
  }
  ngOnInit(): void {
    Transformer.ComposeObjectAsync(
      this.modelServiceService.hostConnectionDeviceDetailJson(1),
      this.ds,
      ConnectionDeviceDetailBuilder
    );
    console.log("Data-source Connectiondetail ::", this.ds);
    this.ds.mediaSetting.onAddingNewItem(
      async (e: { modal: Views.ModalHost }) => {
        e.modal.component = OvenMediaServerFormPresenter;
        const eventId = this.ds.eventId;
        e.modal.properties = { eventId };
        try {
          const data = await e.modal.open();
          if (data) {
            console.log(data);
          }
        } catch {}
      }
    );
    this.ds.relayStream.onAddingNewItem(
      async (e: { modal: Views.ModalHost }) => {
        e.modal.component = RelayStreamPresenter;
        const eventId = this.ds.eventId;
        e.modal.properties = { eventId };
        try {
          const data = await e.modal.open();
          if (data) {
            console.log(data);
          }
        } catch {}
      }
    );
  }
}
