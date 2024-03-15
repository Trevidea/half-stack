import { Observable } from "rxjs";
import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";
import { PayrollModel } from "src/app/model-service/payroll-model";

export class SalarytRateViews implements Views.Datasource {

    id: number;



    private _dtwef: string;
    public get dtwef(): string {
        if (!this._dtwef) {
            this._dtwef = UI.DateHelper.apiDateToday();
        }
        return this._dtwef;
    }
    public set dtwef(v: string) {
        this._dtwef = v;
    }


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




    private _designation: Collection<string>;
    public get designation(): Collection<string> {
        if (!this._designation) {
            this._designation = new Collection<string>();
        }
        return this._designation;
    }
    public set designation(v: Collection<string>) {
        this._designation = v;
    }




    private _bank: Collection<string>;
    public get bank(): Collection<string> {
        if (!this._bank) {
            this._bank = new Collection<string>();
        }
        return this._bank;
    }
    public set bank(v: Collection<string>) {
        this._bank = v;
    }


    private _bankAccountNumber: string;
    public get bankAccountNumber(): string {

        return this._bankAccountNumber;
    }
    public set bankAccountNumber(v: string) {
      
        this._bankAccountNumber = v;
    }


    private _pan: string;
    public get pan(): string {
        return this._pan;
    }
    public set pan(v: string) {
        this._pan = v;
    }

    private _ctc: number;
    public get ctc(): number {
     
        return this._ctc;
    }
    public set ctc(v: number) {

        this._ctc = v;
    }


    private _basicRate: number;
    public get basicRate(): number {
        return this._basicRate;
    }
    public set basicRate(v: number) {
        this._basicRate = v;
    }


    private _hraRate: number;
    public get hraRate(): number {
        return this._hraRate;
    }
    public set hraRate(v: number) {
        this._hraRate = v;
    }


    private _conveyanceAllowance: number;
    public get conveyanceAllowance(): number {
        return this._conveyanceAllowance;
    }
    public set conveyanceAllowance(v: number) {
        this._conveyanceAllowance = v;
    }


    private _medicalAllowance: number;
    public get medicalAllowance(): number {
        return this._medicalAllowance;
    }
    public set medicalAllowance(v: number) {
        this._medicalAllowance = v;
    }


    private _epfRate: number;
    public get epfRate(): number {
        return this._epfRate;
    }
    public set epfRate(v: number) {
        this._epfRate = v;
    }

    
    private _employeeName : string;
    public get employeeName() : string {
        return this._employeeName;
    }
    public set employeeName(v : string) {
        this._employeeName = v;
    }
    
    private _employeeCode: string;
    public get employeeCode(): string {
        return this._employeeCode;
    }
    public set employeeCode(v: string) {
        this._employeeCode = v;
    }

    private _payrollMonth: string;
    public get payrollMonth(): string {
        return this._payrollMonth;
    }
    public set payrollMonth(v: string) {
        this._payrollMonth = v;
    }



}