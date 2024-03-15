import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class FileIndexData extends DataBase<Data.FileIndex>{
    public get dtCreated(): string {
        return this._model.dtCreated;
    }
    public set dtCreated(v: string) {
        this._model.dtCreated = v;
    }

    public get size(): number {
        return this._model.size;
    }
    public set size(v: number) {
        this._model.size = v;
    }

    public get hash(): number {
        return this._model.hash;
    }
    public set hash(v: number) {
        this._model.hash = v;
    }

    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }

    private _type:Data.DataType ;
    public get type(): Data.DataType {
        return this._type;
    }
    public set type(v:Data.DataType) {
        this._type = v;
    }


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



    private _status: Data.DataStatus;
    public get status():Data.DataStatus {
        return this._status;
    }
    public set status(v: Data.DataStatus) {
        this._status = v;
    }

    public get dttReceived(): string {
        return this._model.dttReceived;
    }
    public set dttReceived(v: string) {
        this._model.dttReceived = v;
    }

    public get deviceId(): number {
        return this._model.deviceId;
    }
    public set deviceId(v: number) {
        this._model.deviceId = v;
    }

}

