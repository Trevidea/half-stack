import { Views } from "src/app/model-service/payroll-interface";

export class ConfigurationView implements Views.Datasource {
    id: number;

    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = v;
    }
    
    
    private _value : string;
    public get value() : string {
        return this._value;
    }
    public set value(v : string) {
        this._value = v;
    }
    
}