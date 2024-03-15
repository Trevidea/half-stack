import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollAttendanceView } from "../views/payroll-attendance";

export class PayrollBuilder implements AbstractBuilder<Data.Payroll, PayrollAttendanceView>
{
    compose(m: Data.Payroll, v: PayrollAttendanceView) {
        // v.payrollId.SelectedItem.value = m.month + ' ' + m.year
        // v.payrollId.Select((item: SelectItemView)=> {return item.key = m.id})

    }
    decompose(v: PayrollAttendanceView): Data.Payroll {
        throw new Error("Method not implemented.");
    }
    view(): PayrollAttendanceView {
        throw new Error("Method not implemented.");
    }
    
}