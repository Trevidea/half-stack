import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
import { ActiveDeviceView, EventPreview } from "../views/event-preview";
import { Transformer } from "src/app/blocks/transformer";


export class EventPreviewBuilder extends AbstractBuilder<Data.Preview, EventPreview> {
  compose(m: Data.Preview, v: EventPreview) {
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
  }
  decompose(v: EventPreview): Data.Preview {
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
