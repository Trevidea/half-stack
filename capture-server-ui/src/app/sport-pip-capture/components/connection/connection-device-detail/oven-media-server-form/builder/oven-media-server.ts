import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OvenMediaServerView } from "../views/oven-media-server";
import { AbstractBuilder } from "app/blocks/strategies";

export class SharedWithBuilder extends AbstractBuilder<
  Data.OvenMediaServer,
  OvenMediaServerView
> {
  compose(m: Data.OvenMediaServer, v: OvenMediaServerView) {
    v.bitRate = m.bitRate;
    v.frameRate = m.frameRate;
    v.keyFrameInterval = m.keyFrameInterval;
    v.name = m.name;
    v.partHoldBack = m.partHoldBack;
    v.rtmpServer = m.rtmpServer;
    v.sampleRate = m.sampleRate;
    v.segmentCount = m.segmentCount;
    v.segmentDuration = m.segmentDuration;
    v.sentbytes = m.sentbytes;
    v.statusCode = m.statusCode;
    v.streamWorkerCount = m.streamWorkerCount;
  }
  decompose(v: OvenMediaServerView): Data.OvenMediaServer {
    return {
      id: v.id,
      bitRate: v.bitRate,
      frameRate: v.frameRate,
      keyFrameInterval: v.keyFrameInterval,
      name: v.name,
      partHoldBack: v.partHoldBack,
      rtmpServer: v.rtmpServer,
      sampleRate: v.sampleRate,
      segmentCount: v.segmentCount,
      segmentDuration: v.segmentDuration,
      sentbytes: v.sentbytes,
      statusCode: v.statusCode,
      streamWorkerCount: v.streamWorkerCount,
    };
  }
  view(): OvenMediaServerView {
    return new OvenMediaServerView();
  }
}
