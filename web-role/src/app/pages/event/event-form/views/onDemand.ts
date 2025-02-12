
import { Collection } from "src/app/blocks/collection";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";


export class OnDemandEventFormView implements Views.Datasource {


    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _formType: string;
    public get formType(): string {
        return this._formType;
    }
    public set formType(v: string) {
        this._formType = v;
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
    private _years: Collection<string>;
    public get years(): Collection<string> {
        if (!this._years) {
            this._years = new Collection<string>();
        }
        return this._years;
    }
    public set years(v: Collection<string>) {
        this._years = v;
    }

    private _sports: Collection<string>;
    public get sports(): Collection<string> {
        if (!this._sports) {
            this._sports = new Collection<string>();
        }
        return this._sports;
    }
    public set sports(v: Collection<string>) {
        this._sports = v;
    }
    private _programs: Collection<string>;
    public get programs(): Collection<string> {
        if (!this._programs) {
            this._programs = new Collection<string>();
        }
        return this._programs;
    }
    public set programs(v: Collection<string>) {
        this._programs = v;
    }

    private _levels: Collection<string>;
    public get levels(): Collection<string> {
        if (!this._levels) {
            this._levels = new Collection<string>();
        }
        return this._levels;
    }
    public set levels(v: Collection<string>) {
        this._levels = v;
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

    private _time: string;
    public get time(): string {
        return this._time;
    }
    public set time(v: string) {
        this._time = v;
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
