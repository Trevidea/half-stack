import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { MonthlySalaryView } from "../views/monthly-salary";

export class EmployeeBuilder implements  AbstractBuilder<Data.Employee, MonthlySalaryView>{
    compose(m: Data.Employee, v: MonthlySalaryView) {
        console.log(m,v)
       v.employeeCode = m.code
    }
    decompose(v: MonthlySalaryView): Data.Employee {
        throw new Error("Method not implemented.");
    }
    view(): MonthlySalaryView {
        return new MonthlySalaryView()
    }
}