import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class EmployeeModel extends DataBase<Data.Employee> {
    
    public get dt_joining() : string {
        return this._model.dt_joining;
    }
    public set dtjoining(v : string) {
        this._model.dt_joining = v;
    }
    
    
    public get weekly_off() : number {
        return this._model.weekly_off;
    }
    public set weekly_off(v : number) {
        this._model.weekly_off = v;
    }

    
    public get last_name() : string {
        return this._model.last_name;
    }
    public set last_name(v : string) {
        this._model.last_name = v;
    }
    
    
    public get designation() : string {
        return this._model.designation;
    }
    public set designation(v : string) {
        this._model.designation = v;
    }
    
    
    public get department() : string {
        return this._model.department;
    }
    public set department(v : string) {
        this._model.department = v;
    }
    
    
    public get holiday_cat() : string {
        return this._model.holiday_cat;
    }
    public set holidaycat(v : string) {
        this._model.holiday_cat = v;
    }
    
    
    public get code() : string {
        return this._model.code;
    }
    public set code(v : string) {
        this._model.code = v;
    }
    
    
    public get first_name() : string {
        return this._model.first_name;
    }
    public set first_name(v : string) {
        this._model.first_name = v;
    }
    
    public get paid_alc() : number {
        return this._model.paid_alc;
    }
    public set paid_alc(v : number) {
        this._model.paid_alc = v;
    }
    
    public get sick_alc() : number {
        return this._model.sick_alc;
    }
    public set sick_alc(v : number) {
        this._model.sick_alc = v;
    }
    
    public get paid_bal() : number {
        return this._model.paid_bal;
    }
    public set paid_bal(v : number) {
        this._model.paid_bal = v;
    }
    
    public get sick_bal() : number {
        return this._model.sick_bal;
    }
    public set sickbal(v : number) {
        this._model.sick_bal = v;
    }
    
    public get in_time() : number {
        return this._model.in_time;
    }
    public set in_time(v : number) {
        this._model.in_time = v;
    }
    
    public get out_time() : number {
        return this._model.out_time;
    }
    public set out_time(v : number) {
        this._model.out_time = v;
    }
    
}
/*
 : number,
        : number,
        : number,
        : number,
*/