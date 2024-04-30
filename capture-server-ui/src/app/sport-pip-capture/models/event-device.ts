import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class EventDeviceData extends DataBase<Data.EventDevice> {
    private _user_id: number;
    public get user_id(): number {
        return this._model.user_id;
    }
    public set user_id(v: number) {
        this._model.user_id = v;
    }

    private _device_id: number;
    public get device_id(): number {
        return this._model.device_id;
    }
    public set device_id(v: number) {
        this._model.device_id = v;
    }


    private _pin: string;
    public get pin(): string {
        return this._model.pin;
    }
    public set pin(v: string) {
        this._model.pin = v;
    }


    private _location: string;
    public get location(): string {
        return this._model.location;
    }
    public set location(v: string) {
        this._model.location = v;
    }
    
    
    private _event_id : number;
    public get event_id() : number {
        return this._event_id;
    }
    public set event_id(v : number) {
        this._event_id = v;
    }
    
}