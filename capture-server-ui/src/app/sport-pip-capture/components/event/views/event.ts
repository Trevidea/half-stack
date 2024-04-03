import { Collection, Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";


export class EventRange implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _event: Range<EventView>;
    public get event(): Range<EventView> {
        if (!this._event) {
            this._event = new Range<EventView>();
        }
        return this._event;
    }
    public set event(v: Range<EventView>) {
        this._event = v;
    }

}
export class EventView implements Views.Datasource {
    private _id: number;
    v: {};
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

    private _dtEvent: Date;
    public get dtEvent(): Date {
        return this._dtEvent;
    }
    public set dtEvent(v: Date) {
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

    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }

}
export class EventDetailView {

    private _streetAdress: string;
    public get streetAdress(): string {
        return this._streetAdress;
    }
    public set streetAdress(v: string) {
        this._streetAdress = v;
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
