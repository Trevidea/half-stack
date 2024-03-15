import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { EmployeeView } from "../views/employee";
// dtjoining: string,
// weeklyoff: string,
// lastname: string,
// designation: string,
// department: string,
// holidaycat: string,
// code: string,
// firstname: string
export class EmployeeBuilder implements AbstractBuilder<Data.Employee, EmployeeView>
{
    compose(m: Data.Employee, v: EmployeeView) {
        console.log(m)
        v.id = m.id
        v.weeklyOff = m.weekly_off
        v.firstName = m.first_name
        v.lastName = m.last_name
        v.designation.SelectedItem = m.designation
        v.department.SelectedItem = m.department
        v.holidays.SelectedItem = m.holiday_cat
        v.employeeCode = m.code
        v.joiningDate = m.dt_joining
        v.paidAllocated = m.paid_alc,
        v.sickAllocated = m.sick_alc,
        v.paidBalance = m.paid_bal,
        v.sickBalance = m.sick_bal,
        v.workHrsIn = ("0000" + m.in_time).slice(-4);
        v.workHrsOut = ("0000" + m.out_time).slice(-4);
    }
    decompose(v: EmployeeView): Data.Employee {
        console.log(v)
        return {
            id: v.id,
            weekly_off: v.weeklyOff,
            first_name: v.firstName,
            last_name: v.lastName,
            designation: v.designation.SelectedItem,
            department: v.department.SelectedItem,
            holiday_cat: v.holidays.SelectedItem,
            code: v.employeeCode,
            dt_joining: v.joiningDate,
            paid_alc: v.paidAllocated,
            sick_alc: v.sickAllocated,
            paid_bal: v.paidBalance,
            sick_bal: v.sickBalance,
            in_time: +v.workHrsIn,
            out_time: +v.workHrsOut
        }
    }
    view(): EmployeeView {
        return new EmployeeView();
    }

}