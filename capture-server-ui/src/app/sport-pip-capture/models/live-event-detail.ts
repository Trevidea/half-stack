import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class LiveEventDetailData extends DataBase<Data.LiveEventConnectionDetail> {
    private _sport: string;
    public get sport(): string {
        return this._model.sport;
    }
    public set sport(v: string) {
        this._model.sport = v;
    }


    private _level: string;
    public get level(): string {
        return this._model.level;
    }
    public set level(v: string) {
        this._model.level = v;
    }


    private _program: string;
    public get program(): string {
        return this._model.program;
    }
    public set program(v: string) {
        this._model.program = v;
    }

    private _year: number;
    public get year(): number {
        return this._model.year;
    }
    public set year(v: number) {
        this._model.year = v;
    }

    private _dtEvent: string;
    public get dtEvent(): string {
        return this._model.dtEvent;
    }
    public set dtEvent(v: string) {
        this._model.dtEvent = v;
    }

    private _time: number;
    public get time(): number {
        return this._model.time;
    }
    public set time(v: number) {
        this._model.time = v;
    }

    private _venue: Data.Venue;
    public get venue(): Data.Venue {
        return this._model.venue;
    }
    public set venue(v: Data.Venue) {
        this._model.venue = v;
    }

    public get detail(): Data.Detail {
        return this._model.detail;
    }
    public set detail(v: Data.Detail) {
        this._model.detail = v;
    }

    public get title(): string {
        return this._model.title;
    }
    public set title(v: string) {
        this._model.title = v;
    }

    public get status(): string {
        return this._model.status;
    }
    public set status(v: string) {
        this._model.status = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._model.type = v;
    }



    private _connectionDetails: Data.ConnectionDetails[];
    public get connectionDetails(): Data.ConnectionDetails[] {
        return this._model.connectionDetails;
    }
    public set connectionDetails(v: Data.ConnectionDetails[]) {
        this._model.connectionDetails = v;
    }
}
