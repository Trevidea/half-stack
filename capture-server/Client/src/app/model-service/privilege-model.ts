import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class PrivilegeModel extends DataBase<Data.Privilege> {

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

    public get count(): number {
        return this._model.count;
    }
    public set count(v: number) {
        this._model.count = v;
    }

    public get description(): string {
        return this._model.description;
    }
    public set description(v: string) {
        this._model.description = v;
    }

}