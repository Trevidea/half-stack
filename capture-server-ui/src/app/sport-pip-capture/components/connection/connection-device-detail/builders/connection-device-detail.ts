import { Data } from "app/sport-pip-capture/models/capture-interface";
import {
  ConnectionDeviceDetailView,
  HostConnectionQualityView,
} from "../views/connection-device-detail";
import { AbstractBuilder } from "app/blocks/strategies";
import { Transformer } from "app/blocks/transformer";

export class ConnectionDeviceDetailBuilder extends AbstractBuilder<
  Data.HostConnectionDeviceDetail,
  ConnectionDeviceDetailView
> {
  compose(m: Data.HostConnectionDeviceDetail, v: ConnectionDeviceDetailView) {
    v.chunkDuration = m.chunkDuration;
    v.deviceId = m.deviceId;
    v.deviceType = m.deviceType;
    v.eventId = m.eventId;
    v.id = m.id;
    v.internetConnection = m.internetConnection;
    v.ipAddress = `${m.ipAddress}`;
    v.partHoldBack = m.partHoldBack;
    v.retries = m.retries;
    v.segmentCount = m.segmentCount;
    v.segmentDuration = m.segmentDuration;
    v.transmitStatus = m.transmitStatus;
    v.userName = m.userName;
    Transformer.ComposeCollection(
      m.hostConnectionQuality,
      v.hostConnectionQuality,
      HostConnectionQualityBuilder
    );
  }
  decompose(v: ConnectionDeviceDetailView): Data.HostConnectionDeviceDetail {
    throw new Error("Method not implemented.");
  }
  view(): ConnectionDeviceDetailView {
    throw new ConnectionDeviceDetailView();
  }
}

export class HostConnectionQualityBuilder extends AbstractBuilder<
  Data.HostConnectionQuality,
  HostConnectionQualityView
> {
  compose(m: Data.HostConnectionQuality, v: HostConnectionQualityView) {
    v.deviceId = m.deviceId ? 1 : m.deviceId;
    v.duration = m.duration ? "1:49:00" : m.duration;
    v.end = m.end ? "" : m.end;
    v.id = m.id;
    v.startForm = m.startForm ? "1:49:00" : m.startForm;
    v.videoQuality = m.videoQuality ? 1 : m.videoQuality;
  }
  decompose(v: HostConnectionQualityView): Data.HostConnectionQuality {
    throw new Error("Method not implemented.");
  }
  view(): HostConnectionQualityView {
    return new HostConnectionQualityView();
  }
}
