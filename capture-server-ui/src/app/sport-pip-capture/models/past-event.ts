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

    public get level(): string {
        return this._model.level;
    }
    public set level(v: string) {
        this._model.level = v;
    }

    public get program(): string {
        return this._model.program;
    }
    public set program(v: string) {
        this._model.program = v;
    }

    public get year(): number {
        return this._model.year;
    }
    public set year(v: number) {
        this._model.year = v;
    }

    public get dt_event(): string {
        return this._model.dt_event;
    }
    public set dt_event(v: string) {
        this._model.dt_event = v;
    }

    public get tm_event(): number {
        return this._model.tm_event;
    }
    public set tm_event(v: number) {
        this._model.tm_event = v;
    }

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

    public get status(): string {
        return this._model.status;
    }
    public set status(v: string) {
        this._model.status = v;
    }

    public get type(): string {
        return this._model.type;
    }
    public set type(v: string) {
        this._model.type = v;
    }

    public get video_duration(): string {
        return this._model.video_duration;
    }
    public set video_duration(v: string) {
        this._model.video_duration = v;
    }

    public get shared_with(): string {
        return this._model.shared_with;
    }
    public set shared_with(v: string) {
        this._model.shared_with = v;
    }

    public get connected_streaming_devices(): Data.ConnectedStreamingDevices[] {
        return this._model.connected_streaming_devices;
    }
    public set connected_streaming_devices(v: Data.ConnectedStreamingDevices[]) {
        this._model.connected_streaming_devices = v;
    }


}