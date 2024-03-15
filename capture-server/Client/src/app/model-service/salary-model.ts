import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class SalaryModel extends DataBase<Data.Salary> {

    public get key(): string {
        return this._model.key;
    }
    public set key(v: string) {
        this._model.key = v;
    }

    public get field(): string {
        return this._model.field;
    }
    public set field(v: string) {
        this._model.field = v;
    }


}