import { Views } from "app/sport-pip-capture/models/capture-interface";

export class OvenMediaServerView implements Views.Datasource {
  id: number;

  private _name: string = "Rakesh";
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _rtmpServer: string;
  public get rtmpServer(): string {
    return this._rtmpServer;
  }
  public set rtmpServer(v: string) {
    this._rtmpServer = v;
  }

  private _bitRate: number;
  public get bitRate(): number {
    return this._bitRate;
  }
  public set bitRate(v: number) {
    this._bitRate = v;
  }

  private _sampleRate: number;
  public get sampleRate(): number {
    return this._sampleRate;
  }
  public set sampleRate(v: number) {
    this._sampleRate = v;
  }

  private _keyFrameInterval: number;
  public get keyFrameInterval(): number {
    return this._keyFrameInterval;
  }
  public set keyFrameInterval(v: number) {
    this._keyFrameInterval = v;
  }

  private _frameRate: number;
  public get frameRate(): number {
    return this._frameRate;
  }
  public set frameRate(v: number) {
    this._frameRate = v;
  }

  private _statusCode: number;
  public get statusCode(): number {
    return this._statusCode;
  }
  public set statusCode(v: number) {
    this._statusCode = v;
  }

  private _partHoldBack: number;
  public get partHoldBack(): number {
    return this._partHoldBack;
  }
  public set partHoldBack(v: number) {
    this._partHoldBack = v;
  }

  private _segmentCount: number;
  public get segmentCount(): number {
    return this._segmentCount;
  }
  public set segmentCount(v: number) {
    this._segmentCount = v;
  }

  private _segmentDuration: number;
  public get segmentDuration(): number {
    return this._segmentDuration;
  }
  public set segmentDuration(v: number) {
    this._segmentDuration = v;
  }

  private _streamWorkerCount: number;
  public get streamWorkerCount(): number {
    return this._streamWorkerCount;
  }
  public set streamWorkerCount(v: number) {
    this._streamWorkerCount = v;
  }

  private _sentbytes: number;
  public get sentbytes(): number {
    return this._sentbytes;
  }
  public set sentbytes(v: number) {
    this._sentbytes = v;
  }
}
