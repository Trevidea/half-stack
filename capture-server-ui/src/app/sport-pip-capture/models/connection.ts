import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class ConnectionData extends DataBase<Data.Connection>{

    public get userId(): number {
        return this._model.userId;
    }
    public set userId(v: number) {
        this._model.userId = v;
    }

    public get networkQuality(): Data.NetWorkQuality {
        return this._model.networkQuality;
    }
    public set networkQuality(v: Data.NetWorkQuality) {
        this._model.networkQuality = v;
    }

    public get ipAdd(): string {
        return this._model.ipAdd;
    }
    public set ipAdd(v: string) {
        this._model.ipAdd = v;
    }

    public get type(): Data.Type {
        return this._model.type;
    }
    public set type(v: Data.Type) {
        this._model.type = v;
    }


    public get dttConnected(): string {
        return this._model.dttConnected;
    }
    public set dttConnected(v: string) {
        this._model.dttConnected = v;
    }


    public get priority(): Data.Priority {
        return this._model.priority;
    }
    public set priority(v: Data.Priority) {
        this._model.priority = v;
    }

    public get location(): string {
        return this._model.location;
    }
    public set location(v: string) {
        this._model.location = v;
    }
    
    
    private _isDisabled : boolean;
    public get isDisabled() : boolean {
        return this._isDisabled;
    }
    public set isDisabled(v : boolean) {
        this._isDisabled = v;
    }
    
 }