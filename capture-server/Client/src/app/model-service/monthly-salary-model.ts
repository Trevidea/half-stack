import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class MonthlySalaryModel extends DataBase<Data.MonthlySalary>{


public get employee_id() : number {
    return this._model.employee_id  ;
}
public set employee_id (v : number) {
    this._model.employee_id = v;

}

public get  payroll_id() : number {
    return this._model.payroll_id  ;
}
public set  payroll_id (v : number) {
    this._model. payroll_id = v;

}

public get  basic() : number {
    return this._model.basic  ;
}
public set  basic (v : number) {
    this._model.basic = v;

}



public get hra() : number {
    return this._model.hra;
}
public set hra(v : number) {
    this._model.hra = v;
}

public get act_conveyance() : number {
    return this._model.act_conveyance;
}
public set act_conveyance(v : number) {
    this._model.act_conveyance = v;
}

public get act_medical_all() : number {
    return this._model.act_medical_all;
}
public set act_medical_all(v : number) {
    this._model.act_medical_all = v;
}

public get  act_special_all() : number {
    return this._model. act_special_all;
}
public set  act_special_all(v : number) {
    this._model. act_special_all = v;
}

public get  epf() : number {
    return this._model. epf;
}
public set  epf(v : number) {
    this._model. epf = v;
}


public get  tds() : number {
    return this._model. tds;
}
public set  tds(v : number) {
    this._model. tds = v;
}

public get  advances() : number {
    return this._model. advances;
}
public set  advances(v : number) {
    this._model.advances = v;
}

public get income() : number {
    return this._model. income;
}
public set  income(v : number) {
    this._model.income = v;
}

public get deduction() : number {
    return this._model. deduction;
}
public set  deduction (v: number) {
    this._model.deduction = v;
}

public get net_salary() : number {
    return this._model.net_salary;
}
public set  net_salary (v: number) {
    this._model.net_salary = v;
}
 /***********NON-INTERFACE-READ-ONLY-PROPERTIES************/
 public get code(): string {
    return this._model["code"];
}

public get payrollmonth(): string {
    return this._model["payrollmonth"];
}
/**********************NIROP*******************************/

}