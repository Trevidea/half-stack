import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";

export class SickLeaveView implements Views.Datasource
{
    id: number;

    private _employeeCode : Collection<SelectItemView>;
    public get employeeCode() : Collection<SelectItemView> {
        if(!this._employeeCode){
            this._employeeCode = new Collection<SelectItemView>();
        }
        return this._employeeCode;
    }
    public set employeeCode(v : Collection<SelectItemView>) {
        this._employeeCode = v;
    }

    
    private _dateOfApplication : string;
    public get dateOfApplication() : string {
        if (!this._dateOfApplication) {
            this._dateOfApplication = UI.DateHelper.apiDateToday()
        }
        return this._dateOfApplication;
    }
    public set dateOfApplication(v : string) {
        this._dateOfApplication = v;
    }

    
    private _dateFrom : string;
    public get dateFrom() : string {
        if (!this._dateFrom) {
            this._dateFrom = UI.DateHelper.apiDateToday()
        }
        return this._dateFrom;
    }
    public set dateFrom(v : string) {
        this._dateFrom = v;
    }
    
    
    private _count : number;
    public get count() : number {
        return this._count;
    }
    public set count(v : number) {
        this._count = v;
    }
    
    private _medicalDoc : string;
    public get medicalDoc() : string {
        return this._medicalDoc;
    }
    public set medicalDoc(v : string) {
        this._medicalDoc = v;
    }
    
    
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
}