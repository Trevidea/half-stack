
import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class EventUserData extends DataBase<Data.EventUser>{

    public get eventId(): number {
        return this._model.eventId;
    }
    public set eventId(v: number) {
        this._model.eventId = v;
    }

    public get userId(): number {
        return this._model.userId;
    }
    public set userId(v: number) {
        this._model.userId = v;
    }
    
    public get location() : string {
        return this._model.location;
    }
    public set location(v : string) {
        this._model.location = v;
    }
    
    public get deviceId() : number {
        return this._model.deviceId;
    }
    public set deviceId(v : number) {
        this._model.deviceId = v;
    }
    
    public get pin() : string {
        return this._model.pin;
    }
    public set pin(v : string) {
        this._model.pin = v;
    }
    
}