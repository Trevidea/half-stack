import { Data } from "src/app/model-service/payroll-interface";
import { MonthlyAttendanceView } from "../views/monthly-attendance";
import { AbstractBuilder } from "src/app/blocks/strategies";




export class EmployeeBuilder implements AbstractBuilder<Data.Employee, MonthlyAttendanceView>{
    compose(m: Data.Employee, v: MonthlyAttendanceView) {
        console.log(m,v)
       v.employeeCode = m.code
    }
    decompose(v: MonthlyAttendanceView): Data.Employee {
        throw new Error("Method not implemented.");
    }
    view(): MonthlyAttendanceView {
        return new MonthlyAttendanceView()
    }
   



}