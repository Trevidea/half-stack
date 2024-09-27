import { UI } from "app/blocks/ui-utils";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Collection, Range } from "app/blocks/collection";
import { ConnectionDetailsView } from "./connections";

export class PasEventView implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _eventId: number;
    public get eventId(): number {
        return this._eventId;
    }
    public set eventId(v: number) {
        this._eventId = v;
    }

    private _owner_id: number;
    public get owner_id(): number {
        return this._owner_id;
    }
    public set owner_id(v: number) {
        this._owner_id = v;
    }

    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _sport: string;
    public get sport(): string {
        return this._sport;
    }
    public set sport(v: string) {
        this._sport = v;
    }


    private _program: string;
    public get program(): string {
        return this._program;
    }
    public set program(v: string) {
        this._program = v;
    }

    private _level: string;
    public get level(): string {
        return this._level;
    }
    public set level(v: string) {
        this._level = v;
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
        if (!this._dtEvent) {
            this._dtEvent = UI.DateHelper.apiDateToday()
        }
        return this._dtEvent;
    }
    public set dtEvent(v: string) {
        this._dtEvent = v;
    }

    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(v: string) {
        this._status = v;
    }


    private _detail: DetailsView;
    public get detail(): DetailsView {
        if (!this._detail) {
            this._detail = new DetailsView();
        }
        return this._detail;
    }
    public set detail(v: DetailsView) {
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

    private _time: number;
    public get time(): number {
        return this._time;
    }
    public set time(v: number) {
        this._time = v;
    }


    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

    private _connectionDetailsView: Collection<ConnectionDetailsView>;
    public get connectionDetailsView(): Collection<ConnectionDetailsView> {
        if (!this._connectionDetailsView) {
            this._connectionDetailsView = new Collection<ConnectionDetailsView>();
        }
        return this._connectionDetailsView;
    }
    public set connectionDetailsView(v: Collection<ConnectionDetailsView>) {
        this._connectionDetailsView = v;
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

class DetailsView {

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

}


