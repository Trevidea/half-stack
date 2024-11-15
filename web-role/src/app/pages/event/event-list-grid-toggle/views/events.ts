
import { Collection, Range } from "src/app/blocks/collection"
import { Data, Views } from "src/app/services/models-interfaces/half-stack-interface";
export class EventsRangeView implements Views.Datasource {

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _gridView: boolean = true;
  public get gridView(): boolean {
    return this._gridView;
  }
  public set gridView(v: boolean) {
    this._gridView = v;
  }

  private _activeTab: string = 'on-going';
  public get activeTab(): string {
    return this._activeTab;
  }
  public set activeTab(v: string) {
    this._activeTab = v;
  }

  private _eventView: Collection<EventView>;
  public get eventView(): Collection<EventView> {
    if (!this._eventView) {
      this._eventView = new Collection<EventView>();
    }
    return this._eventView;
  }
  public set eventView(v: Collection<EventView>) {
    this._eventView = v;
  }

  applyFilter(query: Data.DropdownFilter) {
    this.eventView.SetFilter((event: EventView) => this.filterData(event, query));
  }

  private filterData(event: EventView, filter: Data.DropdownFilter): boolean {
    if (event.status == "preview") {
      event.status = "upcoming"
    }
    for (const key in filter) {
      if (filter[key] !== null && event[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  }

}

export class EventView implements Views.Datasource {
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _countdown: string;
  public get countdown(): string {
    return this._countdown;
  }
  public set countdown(v: string) {
    this._countdown = v;
  }

  private _ongoingCountdown: string;
  public get ongoingCountdown(): string {
    return this._ongoingCountdown;
  }
  public set ongoingCountdown(v: string) {
    this._ongoingCountdown = v;
  }

  private _time: number;
  public get time(): number {
    return this._time;
  }
  public set time(v: number) {
    this._time = v;
  }

  private _sport: string;
  public get sport(): string {
    return this._sport;
  }
  public set sport(v: string) {
    this._sport = v;
  }

  private _level: string;
  public get level(): string {
    return this._level;
  }
  public set level(v: string) {
    this._level = v;
  }

  private _program: string;
  public get program(): string {
    return this._program;
  }
  public set program(v: string) {
    this._program = v;
  }

  private _year: number;
  public get year(): number {
    return this._year;
  }
  public set year(v: number) {
    this._year = v;
  }

  private _dtEvent: string;
  public get dtEvent(): string {
    return this._dtEvent;
  }
  public set dtEvent(v: string) {
    this._dtEvent = v;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }

  private _status: string;
  public get status(): string {
    return this._status;
  }
  public set status(v: string) {
    this._status = v;
  }
  private _detail: EventDetailView;
  public get detail(): EventDetailView {
    if (!this._detail) {
      this._detail = new EventDetailView();
    }
    return this._detail;
  }
  public set detail(v: EventDetailView) {
    this._detail = v;
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

  private _formatedDateTime: string;
  public get formatedDateTime(): string {
    return this._formatedDateTime;
  }
  public set formatedDateTime(v: string) {
    this._formatedDateTime = v;
  }

  private _type: string;
  public get type(): string {
    return this._type;
  }
  public set type(v: string) {
    this._type = v;
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

  private _type: string;
  public get type(): string {
    return this._type;
  }
  public set type(v: string) {
    this._type = v;
  }


  private _location: string;
  public get location(): string {
    return this._location;
  }
  public set location(v: string) {
    this._location = v;
  }

}
export class EventDetailView {

}

