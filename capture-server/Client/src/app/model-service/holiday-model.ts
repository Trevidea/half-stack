import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class HolidayModel extends DataBase<Data.Holiday> {
    
    public get dt_holiday() : string {
        return this._model.dt_holiday;
    }
    public set dt_holiday(v : string) {
        this._model.dt_holiday = v;
    }
    
    public get category() : string {
        return this._model.category;
    }
    public set category(v : string) {
        this._model.category = v;
    }
    
    public get year() : number {
        return this._model.year;
    }
    public set year(v : number) {
        this._model.year = v;
    }
    
    public get name() : string {
        return this._model.name;
    }
    public set name(v : string) {
        this._model.name = v;
    }
    
}