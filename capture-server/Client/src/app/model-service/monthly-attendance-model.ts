import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class MonthlyAttendanceModel extends DataBase<Data.MonthlyAttendance>{

    /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
    public get code(): string {
        return this._model["code"];
    }

    public get payroll_month(): string {
        return this._model["payroll_month"];
    }
    /**********************NIROP*******************************/

    public get employee_id(): number {
        return this._model.employee_id;
    }
    public set employee_id(v: number) {
        this._model.employee_id = v;
    }


    public get payroll_id(): number {
        return this._model.payroll_id;
    }
    public set payroll_id(v: number) {
        this._model.payroll_id = v;
    }

    public get total_salary_days(): number {
        return this._model.total_salary_days;
    }
    public set total_salary_days(v: number) {
        this._model.total_salary_days = v;
    }

    public get attended_salary_days(): number {
        return this._model.attended_salary_days;
    }
    public set attended_salary_days(v: number) {
        this._model.attended_salary_days = v;
    }

    public get paid_leaves(): number {
        return this._model.paid_leaves;
    }
    public set paid_leaves(v: number) {
        this._model.paid_leaves = v;
    }

    public get sick_leaves(): number {
        return this._model.sick_leaves;
    }
    public set sick_leaves(v: number) {
        this._model.sick_leaves = v;

    }

    public get cumm_paid_bal(): number {
        return this._model.cumm_paid_bal;
    }
    public set cumm_pai_dbal(v: number) {
        this._model.cumm_paid_bal = v;

    }

    public get cumm_sick_bal(): number {
        return this._model.cumm_sick_bal;
    }
    public set cumm_sick_bal(v: number) {
        this._model.cumm_sick_bal = v;

    }

    public get loss_of_paydays(): number {
        return this._model.loss_of_paydays;
    }
    public set loss_of_paydays(v: number) {
        this._model.loss_of_paydays = v;

    }

    public get late_arrivals(): number {
        return this._model.late_arrivals;
    }
    public set late_arrivals(v: number) {
        this._model.late_arrivals = v;

    }

    public get early_departures(): number {
        return this._model.early_departures;
    }
    public set early_departures(v: number) {
        this._model.early_departures = v;

    }
    public get avg_hours(): number {
        return this._model.avg_hours;
    }
    public set avg_hours(v: number) {
        this._model.avg_hours = v;

    }


}