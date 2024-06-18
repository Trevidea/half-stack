import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class PastEventData extends DataBase<Data.PastEvent> {

    public get title(): string {
        return this._model.title;
    }
    public set title(v: string) {
        this._model.title = v;
    }

    public get sport(): string {
        return this._model.sport;
    }
    public set sport(v: string) {
        this._model.sport = v;
    }

    private _level: string;
    public get level(): string {
        return this._level;
    }
    public set level(v: string) {
        this._level = v;
    }

    public get program(): string {
        return this._model.program;
    }
    public set program(v: string) {
        this._model.program = v;
    }

    private _year: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }

    private _dt_event: string;
    public get dt_event(): string {
        return this._dt_event;
    }
    public set dt_event(v: string) {
        this._dt_event = v;
    }

    private _tm_event: number;
    public get tm_event(): number {
        return this._tm_event;
    }
    public set tm_event(v: number) {
        this._tm_event = v;
    }

    private _venue: Data.Venue;
    public get venue(): Data.Venue {
        return this._venue;
    }
    public set venue(v: Data.Venue) {
        this._venue = v;
    }

    private _detail: Data.Detail;
    public get detail(): Data.Detail {
        return this._detail;
    }
    public set detail(v: Data.Detail) {
        this._detail = v;
    }

    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(v: string) {
        this._status = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

    private _video_duration: string;
    public get video_duration(): string {
        return this._video_duration;
    }
    public set video_duration(v: string) {
        this._video_duration = v;
    }

    private _shared_with: string;
    public get shared_with(): string {
        return this._shared_with;
    }
    public set shared_with(v: string) {
        this._shared_with = v;
    }

    private _connected_streaming_devices: Data.ConnectedStreamingDevices[];
    public get connected_streaming_devices(): Data.ConnectedStreamingDevices[] {
        return this._connected_streaming_devices;
    }
    public set connected_streaming_devices(v: Data.ConnectedStreamingDevices[]) {
        this._connected_streaming_devices = v;
    }


}