import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class HostConnectionDeviceDetailData extends DataBase<Data.HostConnectionDeviceDetail> {
  private _segmentCount: number;
  public get segmentCount(): number {
    return this._model.segmentCount;
  }
  public set segmentCount(v: number) {
    this._model.segmentCount = v;
  }

  private _segmentDuration: number;
  public get segmentDuration(): number {
    return this._model.segmentDuration;
  }
  public set segmentDuration(v: number) {
    this._model.segmentDuration = v;
  }

  private _internetConnection: number;
  public get internetConnection(): number {
    return this._model.internetConnection;
  }
  public set internetConnection(v: number) {
    this._model.internetConnection = v;
  }

  private _retries: number;
  public get retries(): number {
    return this._model.retries;
  }
  public set retries(v: number) {
    this._model.retries = v;
  }

  private _eventId: number;
  public get eventId(): number {
    return this._model.eventId;
  }
  public set eventId(v: number) {
    this._model.eventId = v;
  }

  private _ipAddress: string | number;
  public get ipAddress(): string | number {
    return this._model.ipAddress;
  }
  public set ipAddress(v: string | number) {
    this._model.ipAddress = v;
  }

  private _partHoldBack: string;
  public get partHoldBack(): string {
    return this._model.partHoldBack;
  }
  public set partHoldBack(v: string) {
    this._model.partHoldBack = v;
  }

  private _chunkDuration: string;
  public get chunkDuration(): string {
    return this._model.chunkDuration;
  }
  public set chunkDuration(v: string) {
    this._model.chunkDuration = v;
  }

  private _deviceId: string;
  public get deviceId(): string {
    return this._model.deviceId;
  }
  public set deviceId(v: string) {
    this._model.deviceId = v;
  }

  private _userName: string;
  public get userName(): string {
    return this._model.userName;
  }
  public set userName(v: string) {
    this._model.userName = v;
  }

  private _deviceType: string;
  public get deviceType(): string {
    return this._model.deviceType;
  }
  public set deviceType(v: string) {
    this._model.deviceType = v;
  }

  private _transmitStatus: string;
  public get transmitStatus(): string {
    return this._model.transmitStatus;
  }
  public set transmitStatus(v: string) {
    this._model.transmitStatus = v;
  }

  private _hostConnectionQuality: Data.HostConnectionQuality[];
  public get hostConnectionQuality(): Data.HostConnectionQuality[] {
    return this._model.hostConnectionQuality;
  }
  public set hostConnectionQuality(v: Data.HostConnectionQuality[]) {
    this._model.hostConnectionQuality = v;
  }
}
/*

*/
/*
transmitStatus: string;
deviceType: string;
userName: string;
deviceId: string;
chunkDuration: string;
partHoldBack: string;
ipAddress: string | number;
    eventId: number;
    retries: number;
    internetConnection: number;
    segmentDuration: number;
    segmentCount: number;
*/
