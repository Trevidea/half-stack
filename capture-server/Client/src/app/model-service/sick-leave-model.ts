import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class SickLeaveModel extends DataBase<Data.SickLeave> {

 /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
    public get code(): string {
        return this._model["code"];
    }

 /**********************NIROP*******************************/

    public get employee_id(): number {
        return this._model.employee_id;
    }
    public set employee_id(v: number) {
        this._model.employee_id = v;
    }

    
    public get dt_from() : string {
        return this._model.dt_from;
    }
    public set dt_from(v : string) {
        this._model.dt_from = v;
    }
    
    public get dt_application() : string {
        return this._model.dt_application;
    }
    public set dt_application(v : string) {
        this._model.dt_application = v;
    }
    
    public get count(): number {
        return this._model.count;
    }
    public set count(v: number) {
        this._model.count = v;
    }

    
    public get medical_doc() : string {
        return this._model.medical_doc;
    }
    public set medical_doc(v : string) {
        this._model.medical_doc = v;
    }
    

    public get description(): string {
        return this._model.description;
    }
    public set description(v: string) {
        this._model.description = v;
    }

}