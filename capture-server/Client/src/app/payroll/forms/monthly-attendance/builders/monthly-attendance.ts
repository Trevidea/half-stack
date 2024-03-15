import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { MonthlyAttendanceView } from "../views/monthly-attendance";
import { SelectItemView } from "src/app/blocks/collection-item";

export class MonthlyAttendanceBuilder implements AbstractBuilder<Data.MonthlyAttendance, MonthlyAttendanceView>{
   

    compose(m: Data.MonthlyAttendance, v: MonthlyAttendanceView) {
        console.log(m)
        v.employees.Select((item:SelectItemView)=> m.employee_id == item.key);
        v.payRoll.Select((item:SelectItemView)=> m.payroll_id == item.key);
        // v.payRoll=m.payrollid
        // v.employeeId=m.employeeid;
        v.totalSalaryDays = m.total_salary_days;
        v.attendanceSalaryDays = m.attended_salary_days;
        v.paidLeaves = m.paid_leaves;
        v.sickLeaves = m.sick_leaves;
        v.cummPaidbal = m.cumm_paid_bal;
        v.cummSickbal = m.cumm_paid_bal;
        v.lossOfPayDays = m.loss_of_paydays;
        v.lateArrivals = m.late_arrivals;
        v.earlyDepartures = m.early_departures;
        v.averageHours = m.avg_hours;
       
    }



    decompose(v: MonthlyAttendanceView): Data.MonthlyAttendance {

        return {
            id:v.id,  
            employee_id: v.employees.SelectedItem.key,
            payroll_id: v.payRoll.SelectedItem.key,
            total_salary_days: v.totalSalaryDays,
            attended_salary_days: v.attendanceSalaryDays,
            paid_leaves: v.paidLeaves,
            sick_leaves: v.sickLeaves,
            cumm_paid_bal: v.cummPaidbal,
            cumm_sick_bal:v.cummSickbal,
            loss_of_paydays: v.lossOfPayDays,
            late_arrivals: v.lateArrivals,
            early_departures: v.earlyDepartures,
            avg_hours: v.averageHours

        }

    }

 

    view(): MonthlyAttendanceView {
       return new MonthlyAttendanceView();
    }




}