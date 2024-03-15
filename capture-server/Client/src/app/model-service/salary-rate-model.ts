import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class SalaryRateModel extends DataBase<Data.SalaryRate>{

 /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
 public get code(): string {
    return this._model["code"];
}

public get payrollmonth(): string {
    return this._model["payrollmonth"];
}
/**********************NIROP*******************************/
   public get employee_id() : number{
        return this._model.employee_id;
    }
    public set employee_id(v : number) {
        this._model.employee_id = v;
    }
    
   
    public get dt_wef() : string {
        return this._model.dt_wef;
    }
    public set dt_wef(v : string) {
        this._model.dt_wef = v;
    }
    
    
    public get designation() : string {
        return this._model.designation;
    }
    public set designation(v : string) {
        this._model.designation = v;
    }

    
  
    public get bank() : string {
        return this._model.bank;
    }
    public set bank(v : string) {
        this._model.bank = v;
    }
    
    
    public get bank_acc_number() : string {
        return this._model.bank_acc_number;
    }
    public set bank_acc_number(v : string) {
        this._model.bank_acc_number = v;
    }
    
    
    
    public get pan() : string {
        return this._model.pan;
    }
    public set pan(v : string) {
        this._model.pan = v;

    }

    public get ctc() : number {
        return this._model.ctc;
    }
    public set ctc(v : number) {
        this._model.ctc = v;
    }
    
  
    public get basic_rate() : number {
        return this._model.basic_rate;
    }
    public set basic_rate(v : number) {
        this._model.basic_rate = v;
    }
    
    

    public get hra_rate() : number {
        return this._model.hra_rate;
    }
    public set hra_rate(v : number) {
        this._model.hra_rate = v;
    }
    
    
    
 
    public get conveyance_all() : number {
        return this._model.conveyance_all;
    }
    public set conveyance_all(v : number) {
        this._model.conveyance_all = v;
    }
    
    
  
    public get medical_all() : number {
        return this._model.medical_all;
    }
    public set medical_all(v : number) {
        this._model.medical_all = v;
    }
    
    

    public get epf_rate() : number {
        return this._model.epf_rate;
    }
    public set epf_rate(v : number) {
        this._model.epf_rate = v;
    }
   
}