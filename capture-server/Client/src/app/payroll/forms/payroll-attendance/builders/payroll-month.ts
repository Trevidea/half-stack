import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollAttendanceView } from "../views/payroll-attendance";

export class PayrollMonthBuilder implements AbstractBuilder<Data.Payroll, PayrollAttendanceView>
{
    compose(m: Data.Payroll, v: PayrollAttendanceView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: PayrollAttendanceView): Data.Payroll {
        throw new Error("Method not implemented.");
    }
    view(): PayrollAttendanceView {
        throw new Error("Method not implemented.");
    }

}