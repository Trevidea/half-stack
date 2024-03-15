import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class PayrollAttendanceView implements Views.Datasource {
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

    
    private _payrollId : Collection<SelectItemView>;
    public get payrollId() : Collection<SelectItemView> {
        if(!this._payrollId){
            this._payrollId = new Collection<SelectItemView>();
        }
        return this._payrollId;
    }
    public set payrollId(v : Collection<SelectItemView>) {
        this._payrollId = v;
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