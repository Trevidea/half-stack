import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { SalaryView } from "../views/salary";

export class SalaryBuilder implements AbstractBuilder<Data.Salary, SalaryView>
{
    compose(m: Data.Salary, v: SalaryView) {
        v.field = m.field
        v.id = m.id
        v.key = m.key
    }
    decompose(v: SalaryView): Data.Salary {
        return {
            field: v.field,
            id: v.id,
            key: v.key
        }
    }
    view(): SalaryView {
        return new SalaryView();
    }


}