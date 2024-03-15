import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollEmployeeView } from "../views/payroll-employee";

export class PayrollEmployeeBuilder implements AbstractBuilder<Data.PayrollEmployee, PayrollEmployeeView>
{
    compose(m: Data.PayrollEmployee, v: PayrollEmployeeView) {
        v.bank = m.bank
        v.bankAccountNumber = m.bankaccountnumber
        v.basicRate = m.basicrate
        v.conveyanceAllowance = m.conveyanceallowance
        v.ctc = m.ctc
        v.designation = m.designation
        v.employeeCode.Select((item: SelectItemView) => { return item.key = m.employeeid })
        v.epfRate = m.epfrate
        v.hraRate = m.hrarate
        v.id = m.id
        v.medAllowance = m.medicalallowance
        v.pan = m.pan
        v.payrollId.Select((item: SelectItemView) => { return item.key = m.payrollid })
    }
    decompose(v: PayrollEmployeeView): Data.PayrollEmployee {
        return {
            bank: v.bank,
            bankaccountnumber: v.bankAccountNumber,
            basicrate: v.basicRate,
            conveyanceallowance: v.conveyanceAllowance,
            ctc: v.ctc,
            designation: v.designation,
            employeeid: v.employeeCode.SelectedItem.key,
            epfrate: v.epfRate,
            hrarate: v.hraRate,
            id: v.id,
            medicalallowance: v.medAllowance,
            pan: v.pan,
            payrollid: v.payrollId.SelectedItem.key
        }
    }
    view(): PayrollEmployeeView {
        return new PayrollEmployeeView()
    }

}