import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ActiveDeviceView, EventPreview } from "../views/event-preview";
import { AbstractBuilder } from "app/blocks/strategies";
import { Transformer } from "app/blocks/transformer";

export class EventPreviewBuilder extends AbstractBuilder<Data.ConnectionPreview, EventPreview> {
  compose(m: Data.ConnectionPreview, v: EventPreview) {
    console.log(":::::model of preview", m)
    v.title = m.title
    v.title = m.title;
    v.program = m.program
    Transformer.ComposeCollection(
      m?.activeDevice,
      v?.previewActiveDevice,
      ActiveDeviceBuilder
    );
    v.level = m.level;
    v.status = m.status;
    v.dtEvent = m.dtEvent;
    v.time = m.time;
    v.type = m.type;
    v.venue = m.venue;
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
    // m.deviceId = v.deviceId;
    v.deviceType = m.deviceType
    v.location = m.location
    v.network = m.network;
     v.user = m.name
  }
  decompose(v: ActiveDeviceView): Data.ActiveDevice {
    throw new Error("Method not implemented.");
  }
  view(): ActiveDeviceView {
    return new ActiveDeviceView();
  }
}
