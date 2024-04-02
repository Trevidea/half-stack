import { DataBase } from "./model";
import { Data } from "./capture-interface";
import { Collection } from "app/blocks/collection";

export class ConnectionPreviewData extends DataBase<Data.ConnectionPreview> {
  private _id: number;
  private _dtEvent: string;
  private _level: string;
  private _program: string;
  private _sport: string;
  private _status: string;
  private _title: string;
  private _detail: {
    cityAddress: string;
    streetAdress: string;
    type: string;
  };
  private _year: number;
  private _venue: {
    location: string;
  };
  private _time: number;
  private _type: string;
  private _countdown: string;
  private _activeDevice: Data.ActiveDevice;

  // Getters
  get id(): number {
    return this._model.id;
  }

  get dtEvent(): string {
    return this._model.dtEvent;
  }

  get level(): string {
    return this._model.level;
  }

  get program(): string {
    return this._model.program;
  }

  get sport(): string {
    return this._model.sport;
  }

  get status(): string {
    return this._model.status;
  }

  get title(): string {
    return this._model.title;
  }

  get detail(): { cityAddress: string; streetAdress: string; type: string } {
    return this._model.detail;
  }

  get year(): number {
    return this._model.year;
  }

  get venue(): { location: string } {
    return this._model.venue;
  }

  get time(): number {
    return this._model.time;
  }

  get type(): string {
    return this._model.type;
  }

  get countdown(): string {
    return this._model.countdown;
  }

  get activeDevice(): Data.ActiveDevice[] {
    return this._model.activeDevice;
  }

  // Setters
  set id(value: number) {
    this._model.id = value;
  }

  set dtEvent(value: string) {
    this._model.dtEvent = value;
  }

  set level(value: string) {
    this._model.level = value;
  }

  set program(value: string) {
    this._model.program = value;
  }

  set sport(value: string) {
    this._model.sport = value;
  }

  set status(value: string) {
    this._model.status = value;
  }

  set title(value: string) {
    this._model.title = value;
  }

  set detail(value: {
    cityAddress: string;
    streetAdress: string;
    type: string;
  }) {
    this._model.detail = value;
  }

  set year(value: number) {
    this._model.year = value;
  }

  set venue(value: { location: string }) {
    this._model.venue = value;
  }

  set time(value: number) {
    this._model.time = value;
  }

  set type(value: string) {
    this._model.type = value;
  }

  set countdown(value: string) {
    this._model.countdown = value;
  }

  set activeDevice(value: Data.ActiveDevice[]) {
    this._model.activeDevice = value;
  }
}
