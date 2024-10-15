import { Data } from "./half-stack-interface";
import { DataBase } from "./model";

export class EventDeviceData extends DataBase<Data.AddDeviceToEvent> {

    public get user_id(): number {
        return this._model.user_id;
    }
    public set user_id(v: number) {
        this._model.user_id = v;
    }

    public get device_id(): number {
        return this._model.device_id;
    }
    public set device_id(v: number) {
        this._model.device_id = v;
    }

    public get pin(): string {
        return this._model.pin;
    }
    public set pin(v: string) {
        this._model.pin = v;
    }

    public get location(): string {
        return this._model.location;
    }
    public set location(v: string) {
        this._model.location = v;
    }

    public get event_id(): number {
        return this._model.event_id;
    }
    public set event_id(v: number) {
        this._model.event_id = v;
    }

    public get stream_name(): string {
        return this._model.stream_name;
    }
    public set stream_name(v: string) {
        this._model.stream_name = v;
    }

    public get stream_id(): string {
        return this._model.stream_id;
    }
    public set stream_id(v: string) {
        this._model.stream_id = v;
    }

    public get direction(): number {
        return this._model.direction;
    }
    public set direction(v: number) {
        this._model.direction = v;
    }


}