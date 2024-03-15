import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class PayrollModel extends DataBase<Data.Payroll> {

    public get month(): number {
        return this._model.month;
    }
    public set month(v: number) {
        this._model.month = v;
    }


    public get year(): number {
        return this._model.year;
    }
    public set year(v: number) {
        this._model.year = v;
    }


    public get dt_processed(): string {
        return this._model.dt_processed;
    }
    public set dt_processed(v: string) {
        this._model.dt_processed = v;
    }

}