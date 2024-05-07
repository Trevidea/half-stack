import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class OvenMediaServerData extends DataBase<Data.OvenMediaServer> {
  private _name: string;
  public get name(): string {
    return this._model.name;
  }
  public set name(v: string) {
    this._model.name = v;
  }

  private _rtmpServer: string;
  public get rtmpServer(): string {
    return this._model.rtmpServer;
  }
  public set rtmpServer(v: string) {
    this._model.rtmpServer = v;
  }

  private _bitRate: number;
  public get bitRate(): number {
    return this._model.bitRate;
  }
  public set bitRate(v: number) {
    this._model.bitRate = v;
  }

  private _sampleRate: number;
  public get sampleRate(): number {
    return this._model.sampleRate;
  }
  public set sampleRate(v: number) {
    this._model.sampleRate = v;
  }

  private _keyFrameInterval: number;
  public get keyFrameInterval(): number {
    return this._model.keyFrameInterval;
  }
  public set keyFrameInterval(v: number) {
    this._model.keyFrameInterval = v;
  }

  private _frameRate: number;
  public get frameRate(): number {
    return this._model.frameRate;
  }
  public set frameRate(v: number) {
    this._model.frameRate = v;
  }

  private _statusCode: number;
  public get statusCode(): number {
    return this._model.statusCode;
  }
  public set statusCode(v: number) {
    this._model.statusCode = v;
  }

  private _partHoldBack: number;
  public get partHoldBack(): number {
    return this._model.partHoldBack;
  }
  public set partHoldBack(v: number) {
    this._model.partHoldBack = v;
  }

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

  private _streamWorkerCount: number;
  public get streamWorkerCount(): number {
    return this._model.streamWorkerCount;
  }
  public set streamWorkerCount(v: number) {
    this._model.streamWorkerCount = v;
  }

  private _sentbytes: number;
  public get sentbytes(): number {
    return this._model.sentbytes;
  }
  public set sentbytes(v: number) {
    this._model.sentbytes = v;
  }
}
