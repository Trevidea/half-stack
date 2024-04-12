import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ActiveDeviceView, EventPreviewView } from "../views/event-preview";
import { AbstractBuilder } from "app/blocks/strategies";
import { Transformer } from "app/blocks/transformer";

export class EventPreviewBuilder extends AbstractBuilder<
  Data.ConnectionPreview,
  EventPreviewView
> {
  compose(m: Data.ConnectionPreview, v: EventPreviewView) {
    m.countdown = v.countdown;
    m.title = v.title;
    m.program = v.program;
    Transformer.ComposeCollection(
      m.activeDevice,
      v.activeDevice,
      ActiveDeviceBuilder
    );
  }
  decompose(v: EventPreviewView): Data.ConnectionPreview {
    throw new Error("Method not implemented.");
  }
  view(): EventPreviewView {
    return new EventPreviewView();
  }
}
export class ActiveDeviceBuilder extends AbstractBuilder<
  Data.ActiveDevice,
  ActiveDeviceView
> {
  compose(m: Data.ActiveDevice, v: ActiveDeviceView) {
    m.deviceId = v.deviceId;
    m.deviceType = v.deviceType;
    m.location = v.location;
    m.network = v.network;
    m.user = v.user;
  }
  decompose(v: ActiveDeviceView): Data.ActiveDevice {
    throw new Error("Method not implemented.");
  }
  view(): ActiveDeviceView {
    return new ActiveDeviceView();
  }
}
