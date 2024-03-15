import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { LeaveView } from "../views/leave";

export class LeaveBuilder implements AbstractBuilder<Data.Leave, LeaveView>
{
    compose(m: Data.Leave, v: LeaveView) {
        v.employeeCode.Select((item: SelectItemView) => { return item.key = m.employeeid })
        v.payrollId.Select((item: SelectItemView) => { return item.key = m.payrollid })
        v.id = m.id
        v.paidLeaveBalance = m.paidbal
        v.paidLeaveTaken = m.paidalc
        v.sickLeaveBalance = m.sickbal
        v.sickLeaveTaken = m.sickalc
        v.privilegeLeave = m.privilegedleave
    }
    decompose(v: LeaveView): Data.Leave {
        return {
            employeeid: v.employeeCode.SelectedItem.key,
            payrollid: v.payrollId.SelectedItem.key,
            id: v.id,
            paidbal: v.paidLeaveBalance,
            paidalc: v.paidLeaveTaken,
            sickbal: v.sickLeaveBalance,
            sickalc: v.sickLeaveTaken,
            privilegedleave: v.privilegeLeave
        }
    }
    view(): LeaveView {
        return new LeaveView();
    }

}