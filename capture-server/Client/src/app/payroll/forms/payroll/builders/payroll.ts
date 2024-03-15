import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollView } from "../views/payroll";

export class PayrollBuilder implements AbstractBuilder<Data.Payroll, PayrollView>
{
    compose(m: Data.Payroll, v: PayrollView) {
        v.id = m.id
        v.month = m.month
        v.year = m.year
        v.processedDate = m.dt_processed

    }
    decompose(v: PayrollView): Data.Payroll {
        return {
            month: v.month,
            year: v.year,
            dt_processed: v.processedDate,
            id : v.id
        }
    }
    view(): PayrollView {
        return new PayrollView();
    }

}