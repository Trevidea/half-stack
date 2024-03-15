import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class MonthlySalaryView implements Views.Datasource {
    id: number;


    private _employees: Collection<SelectItemView>;
    public get employees(): Collection<SelectItemView> {
        if (!this._employees) {
            this._employees = new Collection<SelectItemView>();
        }
        return this._employees;
    }
    public set employees(v: Collection<SelectItemView>) {
        this._employees = v;
    }

    private _employeeId: number;
    public get employeeId(): number {
        return this._employeeId;
    }
    public set employeeId(v: number) {
        this._employeeId = v;
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


    private _basic: number;
    public get basic(): number {
        return this._basic;
    }
    public set basic(v: number) {
        this._basic = v;
    }


    private _hra: number;
    public get hra(): number {
        return this._hra;
    }
    public set hra(v: number) {
        this._hra = v;
    }


    private _actconveyance: number;
    public get actconveyance(): number {
        return this._actconveyance;
    }
    public set actconveyance(v: number) {
        this._actconveyance = v;
    }


    private _actMedicalall: number;
    public get actMedicalall(): number {
        return this._actMedicalall;
    }
    public set actMedicalall(v: number) {
        this._actMedicalall = v;
    }


    private _actSpecialall: number;
    public get actSpecialall(): number {
        return this._actSpecialall;
    }
    public set actSpecialall(v: number) {
        this._actSpecialall = v;
    }


    private _epf: number;
    public get epf(): number {
        return this._epf;
    }
    public set epf(v: number) {
        this._epf = v;
    }


    private _tds: number;
    public get tds(): number {
        return this._tds;
    }
    public set tds(v: number) {
        this._tds = v;
    }


    private _advances: number;
    public get advances(): number {
        return this._advances;
    }
    public set advances(v: number) {
        this._advances = v;
    }


    private _income: number;
    public get income(): number {
        this._income = this._basic +
            this._hra +
            this._actconveyance +
            this._actMedicalall +
            this._actSpecialall +
            this._epf + this._tds
            - this._advances
        return this._income;
    }
    public set income(v: number) {
        this._income = v;
    }


    private _deduction: number;
    public get deduction(): number {
        return this._deduction;
    }
    public set deduction(v: number) {
        this._deduction = v;
    }


    private _netSalary: number;
    public get netSalary(): number {
        this._netSalary = this._income - this._deduction
        return this._netSalary;
    }
    public set netSalary(v: number) {
        this._netSalary = v;
    }

    private _employeeCode: string;
    public get employeeCode(): string {
        return this._employeeCode;
    }
    public set employeeCode(v: string) {
        this._employeeCode = v;
    }

    private _payrollMonthYear: string;
    public get payrollMonthYear(): string {
        return this._payrollMonthYear;
    }
    public set payrollMonthYear(v: string) {
        this._payrollMonthYear = v;
    }


}