import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";
// employeeid: string,
// payrollid: string,
// hrarate: string,
// conveyanceallowance: string,
// medicalallowance: string,
// epfrate: string,
// ctc: string,
// basicrate: string,
// designation: string,
// bank: string,
// bankaccountnumber: string,
// pan: string
export class PayrollEmployeeModel extends DataBase<Data.PayrollEmployee> {

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


    public get hrarate(): number {
        return this._model.hrarate;
    }
    public set hrarate(v: number) {
        this._model.hrarate = v;
    }


    public get conveyanceallowance(): number {
        return this._model.conveyanceallowance;
    }
    public set conveyanceallowance(v: number) {
        this._model.conveyanceallowance = v;
    }


    public get medicalallowance(): number {
        return this._model.medicalallowance;
    }
    public set medicalallowance(v: number) {
        this._model.medicalallowance = v;
    }


    public get epfrate(): number {
        return this._model.epfrate;
    }
    public set epfrate(v: number) {
        this._model.epfrate = v;
    }


    public get ctc(): number {
        return this._model.ctc;
    }
    public set ctc(v: number) {
        this._model.ctc = v;
    }


    public get basicrate(): number {
        return this._model.basicrate;
    }
    public set basicrate(v: number) {
        this._model.basicrate = v;
    }


    public get designation(): string {
        return this._model.designation;
    }
    public set designation(v: string) {
        this._model.designation = v;
    }


    public get bank(): string {
        return this._model.bank;
    }
    public set bank(v: string) {
        this._model.bank = v;
    }


    public get bankaccountnumber(): string {
        return this._model.bankaccountnumber;
    }
    public set bankaccountnumber(v: string) {
        this._model.bankaccountnumber = v;
    }


    public get pan(): string {
        return this._model.pan;
    }
    public set pan(v: string) {
        this._model.pan = v;
    }


}