import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { PayrollAttendanceView } from "../views/payroll-attendance";

export class PayrollAttendanceBuilder implements AbstractBuilder<Data.PayrollAttendance, PayrollAttendanceView>
{
    compose(m: Data.PayrollAttendance, v: PayrollAttendanceView) {
        v.attendanceSalaryDays = m.attendedsalarydays 
        v.averageHours = m.avghours 
        v.earlyDepartures = m.earlydepartures 
        // v.employeeCode.SelectedItem.value = 
        v.employeeCode.Select((item: SelectItemView)=> {return item.key = m.employeeid})
        v.id = m.id
        v.lateArrivals = m.latearrivals 
        v.lossOfPayDays = m.lossofpaydays
        v.paidLeaves = m.paidleaves
        v.sickBalance = m.sickbal
        v.totalSalaryDays = m.totalsalarydays
        v.sickLeaves = m.sickleaves
        v.paidBalance = m.paidbal
        // v.payrollId = m.payrollid
        v.payrollId.Select((item: SelectItemView)=> {return item.key = m.payrollid})

    }
    decompose(v: PayrollAttendanceView): Data.PayrollAttendance {
        return {
            attendedsalarydays: v.attendanceSalaryDays,
            avghours: v.averageHours,
            earlydepartures: v.earlyDepartures,
            employeeid: v.employeeCode.SelectedItem.key,
            id: v.id,
            latearrivals: v.lateArrivals,
            lossofpaydays: v.lossOfPayDays,
            paidleaves: v.paidLeaves,
            sickbal: v.sickBalance,
            totalsalarydays: v.totalSalaryDays,
            sickleaves: v.sickBalance,
            paidbal: v.paidBalance,
            payrollid: v.payrollId.SelectedItem.key
        }
    }
    view(): PayrollAttendanceView {
        return new PayrollAttendanceView();
    }

}