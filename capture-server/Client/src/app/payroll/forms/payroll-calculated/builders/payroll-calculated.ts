import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollCalculatedView } from "../views/payroll-calculated";

export class PayrollCalculatedBuilder implements AbstractBuilder<Data.PayrollCalculated, PayrollCalculatedView>
{
    compose(m: Data.PayrollCalculated, v: PayrollCalculatedView) {
        v.actualConveyanceAllowance = m.actconveyance
        v.actualMedicalAllowance = m.actmedicalall
        v.actualSpecialAllowance = m.actspecialall
        v.advances = m.advances
        v.basic = m.basic
        v.deduction = m.deduction
        v.employeeCode.Select((item: SelectItemView)=> item.key == m.employeeid)
        v.epf = m.epf 
        v.hra = m.hra 
        v.id = m.id
        v.income = m.income
        v.netSalary = m.netsalary
        v.tds = m.tds
        v.payrollId.Select((item: SelectItemView)=> item.key == m.payrollid)
    }
    decompose(v: PayrollCalculatedView): Data.PayrollCalculated {
        return{
            actconveyance: v.actualConveyanceAllowance,
            actmedicalall: v.actualMedicalAllowance,
            actspecialall: v.actualSpecialAllowance,
            advances: v.advances,
            basic: v.basic,
            deduction: v.deduction,
            employeeid: v.employeeCode.SelectedItem.key,
            epf: v.epf,
            hra: v.hra,
            id: v.id,
            income: v.income,
            netsalary: v.netSalary,
            tds: v.tds,
            payrollid: v.payrollId.SelectedItem.key
        }
    }
    view(): PayrollCalculatedView {
        return new PayrollCalculatedView();
    }

}