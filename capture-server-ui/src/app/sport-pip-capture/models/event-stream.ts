import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class EventStreamData extends DataBase<Data.EventStream>{

    public get url(): string {
        return this._model.url;
    }
    public set url(v: string) {
        this._model.url = v;
    }
    
    public get name() : string {
        return this._model.name;
    }
    public set name(v : string) {
        this._model.name = v;
    }

    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = v;
    }
    
    
}