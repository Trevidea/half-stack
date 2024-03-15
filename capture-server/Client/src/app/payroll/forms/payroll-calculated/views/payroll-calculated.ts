import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class PayrollCalculatedView implements Views.Datasource {
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

    
    private _basic : number;
    public get basic() : number {
        return this._basic;
    }
    public set basic(v : number) {
        this._basic = v;
    }

    
    private _hra : number;
    public get hra() : number {
        return this._hra;
    }
    public set hra(v : number) {
        this._hra = v;
    }

    
    private _actualConveyanceAllowance : number;
    public get actualConveyanceAllowance() : number {
        return this._actualConveyanceAllowance;
    }
    public set actualConveyanceAllowance(v : number) {
        this._actualConveyanceAllowance = v;
    }

    
    private _actualMedicalAllowance : number;
    public get actualMedicalAllowance() : number {
        return this._actualMedicalAllowance;
    }
    public set actualMedicalAllowance(v : number) {
        this._actualMedicalAllowance = v;
    }
    
    
    private _actualSpecialAllowance : number;
    public get actualSpecialAllowance() : number {
        return this._actualSpecialAllowance;
    }
    public set actualSpecialAllowance(v : number) {
        this._actualSpecialAllowance = v;
    }
    
    
    private _epf : number;
    public get epf() : number {
        return this._epf;
    }
    public set epf(v : number) {
        this._epf = v;
    }
    
    
    private _tds : number;
    public get tds() : number {
        return this._tds;
    }
    public set tds(v : number) {
        this._tds = v;
    }
    
    
    private _advances : number;
    public get advances() : number {
        return this._advances;
    }
    public set advances(v : number) {
        this._advances = v;
    }

    
    private _income : number;
    public get income() : number {
        return this._income;
    }
    public set income(v : number) {
        this._income = v;
    }

    
    private _deduction : number;
    public get deduction() : number {
        return this._deduction;
    }
    public set deduction(v : number) {
        this._deduction = v;
    }
    
    
    private _netSalary : number;
    public get netSalary() : number {
        return this._netSalary;
    }
    public set netSalary(v : number) {
        this._netSalary = v;
    }
    
    
    
}