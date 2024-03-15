import { Views } from "src/app/model-service/payroll-interface";

export class SalaryView implements Views.Datasource {
    id: number;

    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = v;
    }

    
    private _field : string;
    public get field() : string {
        return this._field;
    }
    public set field(v : string) {
        this._field = v;
    }
    
    
}