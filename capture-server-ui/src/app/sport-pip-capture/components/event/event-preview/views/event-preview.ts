import { Collection } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Range } from "app/blocks/collection";
export class RangeEventPreviewView implements Views.Datasource {

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }


  private _eventPreview: Range<EventPreview>;
  public get eventPreview(): Range<EventPreview> {
    if (!this._eventPreview) {
      this._eventPreview = new Range<EventPreview>();
    }
    return this._eventPreview;
  }
  public set eventPreview(v: Range<EventPreview>) {
    this._eventPreview = v;
  }

}
export class EventPreview implements Views.Datasource {
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
  private _activeDevice: Collection<any>;

  // Getters
  get id(): number {
    return this._id;
  }

  get dtEvent(): string {
    return this._dtEvent;
  }

  get level(): string {
    return this._level;
  }

  get program(): string {
    return this._program;
  }

  get sport(): string {
    return this._sport;
  }

  get status(): string {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get detail(): { cityAddress: string; streetAdress: string; type: string } {
    return this._detail;
  }

  get year(): number {
    return this._year;
  }

  get venue(): { location: string } {
    return this._venue;
  }

  get time(): number {
    return this._time;
  }

  get type(): string {
    return this._type;
  }

  get countdown(): string {
    return this._countdown;
  }

  // get activeDevice(): Collection<ActiveDeviceView> {
  //   if (!this._activeDevice) {
  //     this._activeDevice = new Collection<ActiveDeviceView>();
  //   }
  //   return this._activeDevice;
  // }

  // Setters
  set id(value: number) {
    this._id = value;
  }

  set dtEvent(value: string) {
    this._dtEvent = value;
  }

  set level(value: string) {
    this._level = value;
  }

  set program(value: string) {
    this._program = value;
  }

  set sport(value: string) {
    this._sport = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set detail(value: {
    cityAddress: string;
    streetAdress: string;
    type: string;
  }) {
    this._detail = value;
  }

  set year(value: number) {
    this._year = value;
  }

  set venue(value: { location: string }) {
    this._venue = value;
  }

  set time(value: number) {
    this._time = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set countdown(value: string) {
    this._countdown = value;
  }


  private _previewActiveDevice: Range<ActiveDeviceView>;
  public get previewActiveDevice(): Range<ActiveDeviceView> {
    if (!this._previewActiveDevice) {
      this._previewActiveDevice = new Range<ActiveDeviceView>()
    }
    return this._previewActiveDevice;
  }
  public set previewActiveDevice(v: Range<ActiveDeviceView>) {
    this._previewActiveDevice = v;
  }

}

export class ActiveDeviceView {

  private _network: string;
  public get network(): string {
    return this._network;
  }
  public set network(v: string) {
    this._network = v;
  }

  private _deviceType: string;
  public get deviceType(): string {
    return this._deviceType;
  }
  public set deviceType(v: string) {
    this._deviceType = v;
  }

  private _deviceId: string;
  public get deviceId(): string {
    return this._deviceId;
  }
  public set deviceId(v: string) {
    this._deviceId = v;
  }

  private _location: string;
  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v;
  }

  private _user: string;
  public get user(): string {
    return this._user;
  }
  public set user(v: string) {
    this._user = v;
  }
}

export class VenueView {
  private _location: string;
  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v;
  }
}
