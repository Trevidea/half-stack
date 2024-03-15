import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class MonthlyAttendanceView implements Views.Datasource{
    
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
    private _employeeCode : string;
    public get employeeCode() : string {
        return this._employeeCode;
    }
    public set employeeCode(v : string) {
        this._employeeCode = v;
    }
    
    private _employees : Collection<SelectItemView>;
    public get employees() : Collection<SelectItemView> {
        if(!this._employees)
        {
            this._employees = new Collection<SelectItemView>();
        }
        return this._employees;
    }
    public set employees(v : Collection<SelectItemView>) {
        this._employees = v;
    }
    

private _payrollMonth : string;
public get payrollMonth() : string {
    return this._payrollMonth;
}
public set payrollMonth(v : string) {
    this._payrollMonth = v;
}

 
    
 private _payRoll : Collection<SelectItemView>;
 public get payRoll() : Collection<SelectItemView>{
    if(!this._payRoll){
        this.payRoll = new Collection<SelectItemView>();
    }
    return this._payRoll;
 }
 public set payRoll(v : Collection<SelectItemView>) {
    this._payRoll = v;
 }
 
 
    
    private _employeeId : number;
    public get employeeId() : number {
        return this._employeeId;
    }
    public set employeeId(v : number) {
        this._employeeId = v;
    }
    
    
    
    private _totalSalaryDays : number;
    public get totalSalaryDays() : number {
        return this._totalSalaryDays;
    }
    public set totalSalaryDays(v : number) {
        this._totalSalaryDays = v;
    }

    
    private _attendanceSalaryDays : number;
    public get attendanceSalaryDays() : number {
        return this._attendanceSalaryDays;
    }
    public set attendanceSalaryDays(v : number) {
        this._attendanceSalaryDays = v;
    }
    

    
    private _paidLeaves : number;
    public get paidLeaves() : number {
        return this._paidLeaves;
    }
    public set paidLeaves(v : number) {
        this._paidLeaves = v;
    }
    

    
    private _sickLeaves : number;
    public get sickLeaves() : number {
        return this._sickLeaves;
    }
    public set sickLeaves(v : number) {
        this._sickLeaves = v;
    }


    
    private _cummPaidbal : number;
    public get cummPaidbal() : number {
        return this._cummPaidbal;
    }
    public set cummPaidbal(v : number) {
        this._cummPaidbal = v;
    }
    
    
    private _cummSickbal : number;
    public get cummSickbal() : number {
        return this._cummSickbal;
    }
    public set cummSickbal(v : number) {
        this._cummSickbal = v;
    }
    

    
    private _paidBalance : number;
    public get paidBalance() : number {
        return this._paidBalance;
    }
    public set paidBalance(v : number) {
        this._paidBalance = v;
    }
    
    
    
    private _sickBalance : number;
    public get sickBalance() : number {
        return this._sickBalance;
    }
    public set sickBalance(v : number) {
        this._sickBalance = v;
    }
    
    
    private _lossOfPayDays : number;
    public get lossOfPayDays() : number {
        return this._lossOfPayDays;
    }
    public set lossOfPayDays(v : number) {
        this._lossOfPayDays = v;
    }
    
    
    private _lateArrivals : number;
    public get lateArrivals() : number {
        return this._lateArrivals;
    }
    public set lateArrivals(v : number) {
        this._lateArrivals = v;
    }

    
    private _earlyDepartures : number;
    public get earlyDepartures() : number {
        return this._earlyDepartures;
    }
    public set earlyDepartures(v : number) {
        this._earlyDepartures = v;
    }
    
    
    private _averageHours : number;
    public get averageHours() : number {
        return this._averageHours;
    }
    public set averageHours(v : number) {
        this._averageHours = v;
    }
    
  
    
    
    
}