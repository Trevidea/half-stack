import { Collection, Range } from "src/app/blocks/collection";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";

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

  private _year: number;

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

  get year(): number {
    return this._year;
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

  set year(value: number) {
    this._year = value;
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

  private _venue: VenueView;
  public get venue(): VenueView {
    if (!this._venue) {
      this._venue = new VenueView();
    }
    return this._venue;
  }
  public set venue(v: VenueView) {
    this._venue = v;
  }

  private _previewActiveDevice: Collection<ActiveDeviceView>;
  public get previewActiveDevice(): Collection<ActiveDeviceView> {
    if (!this._previewActiveDevice) {
      this._previewActiveDevice = new Collection<ActiveDeviceView>()
    }
    return this._previewActiveDevice;
  }
  public set previewActiveDevice(v: Collection<ActiveDeviceView>) {
    this._previewActiveDevice = v;
  }

}

export class ActiveDeviceView {
  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }

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


  private _appName: string;
  public get appName(): string {
    return this._appName;
  }
  public set appName(v: string) {
    this._appName = v;
  }


  private _pin: string;
  public get pin(): string {
    return this._pin;
  }
  public set pin(v: string) {
    this._pin = v;
  }


  private _direction: number;
  public get direction(): number {
    return this._direction;
  }
  public set direction(v: number) {
    this._direction = v;
  }

  private _deviceId: number;
  public get deviceId(): number {
    return this._deviceId;
  }
  public set deviceId(v: number) {
    this._deviceId = v;
  }


  private _activeDeviceId: number;
  public get activeDeviceId(): number {
    return this._activeDeviceId;
  }
  public set activeDeviceId(v: number) {
    this._activeDeviceId = v;
  }

}

export class VenueView {
  private _streetAddress: string;
  public get streetAddress(): string {
    return this._streetAddress;
  }
  public set streetAddress(v: string) {
    this._streetAddress = v;
  }

  private _cityAddress: string;
  public get cityAddress(): string {
    return this._cityAddress;
  }
  public set cityAddress(v: string) {
    this._cityAddress = v;
  }

  private _location: string;
  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v;
  }
}
