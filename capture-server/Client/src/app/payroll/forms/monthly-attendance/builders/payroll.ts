import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { MonthlyAttendanceView } from "../views/monthly-attendance";






export class PayrollBuilder implements AbstractBuilder<Data.Payroll, MonthlyAttendanceView>{
    compose(m: Data.Payroll, v: MonthlyAttendanceView) {
        console.log(m)
        const numbersAsString = `${m.month}-${ m.year}`;

console.log(numbersAsString);
        v.payrollMonth = numbersAsString
    }
    decompose(v: MonthlyAttendanceView): Data.Payroll {
        throw new Error("Method not implemented.");
    }
    view(): MonthlyAttendanceView {
        return new MonthlyAttendanceView()
    }

}