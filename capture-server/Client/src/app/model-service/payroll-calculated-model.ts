import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class PayrollCalculatedModel extends DataBase<Data.PayrollCalculated> {

    /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
    public get code(): string {
        return this._model["code"];
    }

    public get payrollmonth(): string {
        return this._model["payrollmonth"];
    }
    /**********************NIROP*******************************/


    public get employeeid(): number {
        return this._model.employeeid;
    }
    public set employeeid(v: number) {
        this._model.employeeid = v;
    }


    public get payrollid(): number {
        return this._model.payrollid;
    }
    public set payrollid(v: number) {
        this._model.payrollid = v;
    }


    public get basic(): number {
        return this._model.basic;
    }
    public set basic(v: number) {
        this._model.basic = v;
    }


    public get hra(): number {
        return this._model.hra;
    }
    public set hra(v: number) {
        this._model.hra = v;
    }


    public get actconveyance(): number {
        return this._model.actconveyance;
    }
    public set actconveyance(v: number) {
        this._model.actconveyance = v;
    }


    public get actmedicalall(): number {
        return this._model.actmedicalall;
    }
    public set actmedicalall(v: number) {
        this._model.actmedicalall = v;
    }


    public get actspecialall(): number {
        return this._model.actspecialall;
    }
    public set actspecialall(v: number) {
        this._model.actspecialall = v;
    }


    public get epf(): number {
        return this._model.epf;
    }
    public set epf(v: number) {
        this._model.epf = v;
    }


    public get tds(): number {
        return this._model.tds;
    }
    public set tds(v: number) {
        this._model.tds = v;
    }


    public get advances(): number {
        return this._model.advances;
    }
    public set advances(v: number) {
        this._model.advances = v;
    }


    public get income(): number {
        return this._model.income;
    }
    public set income(v: number) {
        this._model.income = v;
    }


    public get deduction(): number {
        return this._model.deduction;
    }
    public set deduction(v: number) {
        this._model.deduction = v;
    }


    public get netsalary(): number {
        return this._model.netsalary;
    }
    public set netsalary(v: number) {
        this._model.netsalary = v;
    }

}