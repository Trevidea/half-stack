import { Views } from "app/sport-pip-capture/models/capture-interface";

import { Collection, Range } from "app/blocks/collection";
import { OvenMediaServerView } from "../oven-media-server-form/views/oven-media-server";
import { RelayStreamView } from "../relay-stream/views/relay-stream";

export class ConnectionDeviceDetailView implements Views.Datasource {
  id: number;

  private _segmentCount: number = 12;
  public get segmentCount(): number {
    return this._segmentCount;
  }
  public set segmentCount(v: number) {
    this._segmentCount = v;
  }

  private _segmentDuration: number = 9;
  public get segmentDuration(): number {
    return this._segmentDuration;
  }
  public set segmentDuration(v: number) {
    this._segmentDuration = v;
  }

  private _internetConnection: number = 0;
  public get internetConnection(): number {
    return this._internetConnection;
  }
  public set internetConnection(v: number) {
    this._internetConnection = v;
  }

  private _retries: number = 2;
  public get retries(): number {
    return this._retries;
  }
  public set retries(v: number) {
    this._retries = v;
  }

  private _eventId: number = 12;
  public get eventId(): number {
    return this._eventId;
  }
  public set eventId(v: number) {
    this._eventId = v;
  }

  private _ipAddress: string = "192.168.1.10";
  public get ipAddress(): string {
    return this._ipAddress;
  }
  public set ipAddress(v: string) {
    this._ipAddress = v;
  }

  private _partHoldBack: string = "00:09";
  public get partHoldBack(): string {
    return this._partHoldBack;
  }
  public set partHoldBack(v: string) {
    this._partHoldBack = v;
  }

  private _chunkDuration: string = "00:05";
  public get chunkDuration(): string {
    return this._chunkDuration;
  }
  public set chunkDuration(v: string) {
    this._chunkDuration = v;
  }

  private _deviceId: string = "cc18";
  public get deviceId(): string {
    return this._deviceId;
  }
  public set deviceId(v: string) {
    this._deviceId = v;
  }

  private _userName: string = "Harry";
  public get userName(): string {
    return this._userName;
  }
  public set userName(v: string) {
    this._userName = v;
  }

  private _deviceType: string = "Camcorder";
  public get deviceType(): string {
    return this._deviceType;
  }
  public set deviceType(v: string) {
    this._deviceType = v;
  }

  private _transmitStatus: string = "Streaming";
  public get transmitStatus(): string {
    return this._transmitStatus;
  }
  public set transmitStatus(v: string) {
    this._transmitStatus = v;
  }

  private _hostConnectionQuality: Range<HostConnectionQualityView>;
  public get hostConnectionQuality(): Range<HostConnectionQualityView> {
    if (!this._hostConnectionQuality) {
      this._hostConnectionQuality = new Range<HostConnectionQualityView>();
    }
    return this._hostConnectionQuality;
  }
  public set hostConnectionQuality(v: Range<HostConnectionQualityView>) {
    this._hostConnectionQuality = v;
  }

  private _mediaSetting: Range<OvenMediaServerView>;
  public get mediaSetting(): Range<OvenMediaServerView> {
    if (!this._mediaSetting) {
      this._mediaSetting = new Range<OvenMediaServerView>();
    }
    return this._mediaSetting;
  }
  public set mediaSetting(v: Range<OvenMediaServerView>) {
    this._mediaSetting = v;
  }

  private _relayStream: Range<RelayStreamView>;
  public get relayStream(): Range<RelayStreamView> {
    if (!this._relayStream) {
      this._relayStream = new Range<RelayStreamView>();
    }
    return this._relayStream;
  }
  public set relayStream(v: Range<RelayStreamView>) {
    this._relayStream = v;
  }
}

export class HostConnectionQualityView implements Views.Datasource {
  id: number;

  private _deviceId: number;
  public get deviceId(): number {
    return this._deviceId;
  }
  public set deviceId(v: number) {
    this._deviceId = v;
  }

  private _startForm: string;
  public get startForm(): string {
    return this._startForm;
  }
  public set startForm(v: string) {
    this._startForm = v;
  }

  private _end: string;
  public get end(): string {
    return this._end;
  }
  public set end(v: string) {
    this._end = v;
  }

  private _videoQuality: number;
  public get videoQuality(): number {
    return this._videoQuality;
  }
  public set videoQuality(v: number) {
    this._videoQuality = v;
  }

  private _duration: string | number;
  public get duration(): string | number {
    return this._duration;
  }
  public set duration(v: string | number) {
    this._duration = v;
  }
}
