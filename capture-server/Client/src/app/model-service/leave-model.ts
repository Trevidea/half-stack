import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class LeaveModel extends DataBase<Data.Leave> {


    /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
    public get code(): string {
        return this._model["code"];
    }

    public get payrollmonth(): string {
        return this._model["payrollmonth"];
    }
    /**********************NIROP*******************************/
    
    public get employeeid() : number {
        return this._model.employeeid;
    }
    public set employeeid(v : number) {
        this._model.employeeid = v;
    }
    
    public get payrollid() : number {
        return this._model.payrollid;
    }
    public set payrollid(v : number) {
        this._model.payrollid = v;
    }

    
    public get paidalc() : number {
        return this._model.paidalc;
    }
    public set paidalc(v : number) {
        this._model.paidalc = v;
    }
    
    
    public get sickalc() : number {
        return this._model.sickalc;
    }
    public set sickalc(v : number) {
        this._model.sickalc = v;
    }
    
    
    public get paidbal() : number {
        return this._model.paidbal;
    }
    public set paidbal(v : number) {
        this._model.paidbal = v;
    }
    
    
    public get sickbal() : number {
        return this._model.sickbal;
    }
    public set sickbal(v : number) {
        this._model.sickbal = v;
    }
    
    
    public get privilegedleave() : number {
        return this._model.privilegedleave;
    }
    public set privilegedleave(v : number) {
        this._model.privilegedleave = v;
    }
    
    
}