import { Data } from "src/app/model-service/payroll-interface";
import { MonthlySalaryView } from "../views/monthly-salary";
import { AbstractBuilder } from "src/app/blocks/strategies";

export class PayrollBuilder implements  AbstractBuilder<Data.Payroll, MonthlySalaryView>{
   compose(m: Data.Payroll, v: MonthlySalaryView) {
    const numbersAsString = `${m.month}-${ m.year}`;
       v.payrollMonthYear= numbersAsString
    }
    decompose(v: MonthlySalaryView): Data.Payroll {
        throw new Error("Method not implemented.");
    }
    view(): MonthlySalaryView {
        throw new Error("Method not implemented.");
    }
    
}