import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class ConfigurationModel extends DataBase<Data.Configuration> {
    
    public get key() : string {
        return this._model.key;
    }
    public set key(v : string) {
        this._model.key = v;
    }
    
    
    public get value() : string {
        return this._model.value;
    }
    public set value(v : string) {
        this._model.value = v;
    }
    
}