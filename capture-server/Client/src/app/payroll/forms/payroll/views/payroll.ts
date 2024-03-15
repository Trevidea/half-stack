import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";

export class PayrollView implements Views.Datasource {
    id: number;

    
    private _month : number;
    public get month() : number {
        return this._month;
    }
    public set month(v : number) {
        this._month = v;
    }

    
    private _year : number;
    public get year() : number {
        return this._year;
    }
    public set year(v : number) {
        this._year = v;
    }
    
    
    private _processedDate : string;
    public get processedDate() : string {
        if (!this._processedDate) {
            this._processedDate = UI.DateHelper.apiDateToday()
        }
        return this._processedDate;
    }
    public set processedDate(v : string) {
        this._processedDate = v;
    }
    
}