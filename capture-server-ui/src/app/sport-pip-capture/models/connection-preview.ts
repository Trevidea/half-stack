import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class ConnectionPreviewData extends DataBase<Data.ConnectionPreview> {

  public get dtEvent(): string {
    return this._model.dtEvent;
  }
  public set dtEvent(v: string) {
    this._model.dtEvent = v;
  }

  public get level(): string {
    return this._model.level;
  }
  public set level(v: string) {
    this._model.level = v;
  }


  public get program(): string {
    return this._model.program;
  }
  public set program(v: string) {
    this._model.program = v;
  }


  public get sport(): string {
    return this._model.sport;
  }
  public set sport(v: string) {
    this._model.sport = v;
  }

  public get status(): string {
    return this._model.status;
  }
  public set status(v: string) {
    this._model.status = v;
  }


  public get title(): string {
    return this._model.title;
  }
  public set title(v: string) {
    this._model.title = v;
  }


  public get detail(): Data.Detail {
    return this._model.detail;
  }
  public set detail(v: Data.Detail) {
    this._model.detail = v;
  }


  public get year(): number {
    return this._model.year;
  }
  public set year(v: number) {
    this._model.year = v;
  }


  public get venue(): Data.Venue {
    return this._model.venue;
  }
  public set venue(v: Data.Venue) {
    this._model.venue = v;
  }

  public get time(): number {
    return this._model.time;
  }
  public set time(v: number) {
    this._model.time = v;
  }


  private _type: string;
  public get type(): string {
    return this._type;
  }
  public set type(v: string) {
    this._type = v;
  }

  public get activeDevice(): Data.ActiveDevice[] {
    return this._model.activeDevice;
  }
  public set activeDevice(v: Data.ActiveDevice[]) {
    this._model.activeDevice = v;
  }

}
