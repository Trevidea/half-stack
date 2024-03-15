import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class PayrollAttendanceModel extends DataBase<Data.PayrollAttendance> {
    
    /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
    public get code() : string {
        return this._model["code"];
    }
    
    public get payrollmonth() : string {
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

    public get totalsalarydays(): number {
        return this._model.totalsalarydays;
    }
    public set totalsalarydays(v: number) {
        this._model.totalsalarydays = v;
    }

    public get attendedsalarydays(): number {
        return this._model.attendedsalarydays;
    }
    public set attendedsalarydays(v: number) {
        this._model.attendedsalarydays = v;
    }

    public get paidleaves(): number {
        return this._model.paidleaves;
    }
    public set paidleaves(v: number) {
        this._model.paidleaves = v;
    }


    public get sickleaves(): number {
        return this._model.sickleaves;
    }
    public set sickleaves(v: number) {
        this._model.sickleaves = v;
    }


    public get paidbal(): number {
        return this._model.paidbal;
    }
    public set paidbal(v: number) {
        this._model.paidbal = v;
    }

    public get sickbal(): number {
        return this._model.sickbal;
    }
    public set sickbal(v: number) {
        this._model.sickbal = v;
    }

    public get lossofpaydays(): number {
        return this._model.lossofpaydays;
    }
    public set lossofpaydays(v: number) {
        this._model.lossofpaydays = v;
    }

    public get latearrivals(): number {
        return this._model.latearrivals;
    }
    public set latearrivals(v: number) {
        this._model.latearrivals = v;
    }

    public get earlydepartures(): number {
        return this._model.earlydepartures;
    }
    public set earlydepartures(v: number) {
        this._model.earlydepartures = v;
    }

    public get avghours(): number {
        return this._model.avghours;
    }
    public set avghours(v: number) {
        this._model.avghours = v;
    }

}