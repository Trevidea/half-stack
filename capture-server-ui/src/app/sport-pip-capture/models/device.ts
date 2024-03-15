import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class DeviceData extends DataBase<Data.Device>{
    public get type(): string {
        return this._model.type;
    }
    public set type(v: string) {
        this._model.type = v;
    }


    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }
    
    public get code() : string {
        return this._model.code;
    }
    public set code(v : string) {
        this._model.code = v;
    }
    
    
}