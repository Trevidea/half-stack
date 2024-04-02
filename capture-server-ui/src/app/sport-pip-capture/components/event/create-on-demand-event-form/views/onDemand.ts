import { Collection } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class OnDemandEventFormView implements Views.Datasource {


    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
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


    private _dtEvent: Date;
    public get dttEvent(): Date {
        return this._dtEvent;
    }
    public set dtEvent(v: Date) {
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

    private _dayHalve: Collection<string>;
    public get dayHalve(): Collection<string> {
        if (!this._dayHalve) {
            this._dayHalve = new Collection<string>();
        }
        return this._dayHalve;
    }
    public set dayHalve(v: Collection<string>) {
        this._dayHalve = v;
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
/*
: number
dttEvent: datetime
venue: json
onPremise: boolean
detail: json
title: string
status: enum
*/