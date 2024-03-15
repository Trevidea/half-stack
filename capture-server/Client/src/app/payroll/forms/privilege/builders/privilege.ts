import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PrivilegeView } from "../views/privilege";

export class PrivilegeBuilder implements AbstractBuilder<Data.Privilege, PrivilegeView>
{
    compose(m: Data.Privilege, v: PrivilegeView) {
        console.log(m)
        console.log(v)
        v.count = m.count
        v.description = m.description
        v.employeeCode.Select((item: SelectItemView) => { return item.key == m.employee_id })
        v.payrollId.Select((item: SelectItemView) => { return item.key == m.payroll_id })
        v.id = m.id
    }
    decompose(v: PrivilegeView): Data.Privilege {
        return {
           
            count: v.count,
            description: v.description,
            employee_id: v.employeeCode.SelectedItem.key,
            payroll_id: v.payrollId.SelectedItem.key,
            id: v.id
        }
    }
    view(): PrivilegeView {
        return new PrivilegeView();
    }

}