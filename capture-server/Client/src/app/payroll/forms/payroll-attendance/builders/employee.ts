import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollAttendanceView } from "../views/payroll-attendance";

export class EmployeeBuilder implements AbstractBuilder<Data.Employee, PayrollAttendanceView>
{
    compose(m: Data.Employee, v: PayrollAttendanceView) {
        // v.employeeCode.Select((item: SelectItemView)=> {return item.key = m.id})
    }
    decompose(v: PayrollAttendanceView): Data.Employee {
        throw new Error("Method not implemented.");
    }
    view(): PayrollAttendanceView {
        throw new Error("Method not implemented.");
    }

}