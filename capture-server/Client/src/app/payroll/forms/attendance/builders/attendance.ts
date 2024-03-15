import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { AttendanceView } from "../views/attendance";

export class AttendanceBuilder implements AbstractBuilder<Data.Attendance, AttendanceView>
{
    compose(m: Data.Attendance, v: AttendanceView) {
        v.attendanceDate = m.dt_attendance
        v.code = m.code
        v.holiday = m.holiday
        v.hours = m.hours
        v.id = m.id
        v.inTime = m.in_time
        v.minutes = m.minutes
        v.month = m.month
        v.outTime = m.out_time
        v.weeklyOff = m.weekly_off
        v.workingDay = m.working_day
        v.year = m.year
        v.edited=m.edited

    }
    decompose(v: AttendanceView): Data.Attendance {
        return {
            dt_attendance: v.attendanceDate,
            code: v.code,
            holiday: v.holiday,
            hours: v.hours,
            id: v.id,
            in_time: v.inTime,
            minutes: v.minutes,
            month: v.month,
            out_time: v.outTime,
            weekly_off: v.weeklyOff,
            working_day: v.workingDay,
            year: v.year,
            edited:true

        }
    }
    view(): AttendanceView {
        return new AttendanceView();
    }

}