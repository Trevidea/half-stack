import { Data } from "./half-stack-interface";
import { DataBase } from "./model";


export class PreviousEventsConnectionData extends DataBase<Data.PreviousEventsConnection> {
    private _eventName: string;
    public get eventName(): string {
        return this._eventName;
    }
    public set eventName(v: string) {
        this._eventName = v;
    }

    private _date: string;
    public get date(): string {
        return this._date;
    }
    public set date(v: string) {
        this._date = v;
    }

    private _total_connections: string;
    public get total_connections(): string {
        return this._total_connections;
    }
    public set total_connections(v: string) {
        this._total_connections = v;
    }

    private _duration: string;
    public get duration(): string {
        return this._duration;
    }
    public set duration(v: string) {
        this._duration = v;
    }

    private _most_connected_device: string;
    public get most_connected_device(): string {
        return this._most_connected_device;
    }
    public set most_connected_device(v: string) {
        this._most_connected_device = v;
    }

}
