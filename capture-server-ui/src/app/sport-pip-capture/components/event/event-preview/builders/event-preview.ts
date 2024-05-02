import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ActiveDeviceView, EventPreview } from "../views/event-preview";
import { AbstractBuilder } from "app/blocks/strategies";
import { Transformer } from "app/blocks/transformer";

export class EventPreviewBuilder extends AbstractBuilder<Data.ConnectionPreview, EventPreview> {
  compose(m: Data.ConnectionPreview, v: EventPreview) {
    console.log(":::::model of preview", m)
    v.title = m.title
    m.title = v.title;
    m.program = v.program;
    //  Transformer.ComposeCollection(
    //   m?.activeDevice,
    //   v?.previewActiveDevice,
    //   ActiveDeviceBuilder
    // );
    m.level = v.level;
    m.status = v.status;
    m.dtEvent = v.dtEvent;
    m.time = v.time;
    m.type = v.type;
    // m.detail = v.detail;
    m.venue = v.venue;
  }
  decompose(v: EventPreview): Data.ConnectionPreview {
    throw new Error("Method not implemented.");
  }
  view(): EventPreview {
    return new EventPreview();
  }
}
export class ActiveDeviceBuilder extends AbstractBuilder<Data.ActiveDevice, ActiveDeviceView> {
  compose(m: Data.ActiveDevice, v: ActiveDeviceView) {
    m.deviceId = v.deviceId;
    m.deviceType = v.deviceType;
    m.location = v.location;
    m.network = v.network;
    m.name = v.user;
  }
  decompose(v: ActiveDeviceView): Data.ActiveDevice {
    throw new Error("Method not implemented.");
  }
  view(): ActiveDeviceView {
    return new ActiveDeviceView();
  }
}
