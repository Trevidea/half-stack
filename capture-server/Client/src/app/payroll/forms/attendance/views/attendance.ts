import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";

export class AttendanceView implements Views.Datasource {
    id: number;

    private _year: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }


    private _month: number;
    public get month(): number {
        return this._month;
    }
    public set month(v: number) {
        this._month = v;
    }


    private _code: string;
    public get code(): string {
        return this._code;
    }
    public set code(v: string) {
        this._code = v;
    }


    private _attendanceDate: string;
    public get attendanceDate(): string {
        if (!this._attendanceDate) {
            this._attendanceDate = UI.DateHelper.apiDateToday()
        }
        return this._attendanceDate;
    }
    public set attendanceDate(v: string) {
        this._attendanceDate = v;
    }


    private _inTime: string;
    public get inTime(): string {
        return this._inTime;
    }
    public set inTime(v: string) {
        this._inTime = v;
    }


    private _outTime: string;
    public get outTime(): string {
        return this._outTime;
    }
    public set outTime(v: string) {
        this._outTime = v;
    }


    private _hours: number;
    public get hours(): number {
        return this._hours;
    }
    public set hours(v: number) {
        this._hours = v;
    }


    private _minutes: number;
    public get minutes(): number {
        return this._minutes;
    }
    public set minutes(v: number) {
        this._minutes = v;
    }


    private _workingDay: boolean;
    public get workingDay(): boolean {
        return this._workingDay;
    }
    public set workingDay(v: boolean) {
        this._workingDay = v;
    }


    private _weeklyOff: boolean;
    public get weeklyOff(): boolean {
        return this._weeklyOff;
    }
    public set weeklyOff(v: boolean) {
        this._weeklyOff = v;
    }


    private _holiday: boolean;
    public get holiday(): boolean {
        return this._holiday;
    }
    public set holiday(v: boolean) {
        this._holiday = v;
    }


    private _edited: boolean;
    public get edited(): boolean {
        return this._edited;
    }
    public set edited(v: boolean) {
        this._edited = v;
    }
    getNumberFromTime(tm: string): number {
        if(tm.length == 4)
        {
            let hrs = +tm.substring(0, 2);
            let mins = +tm.substring(2, 4);
            let dt: Date = new Date();
            dt.setHours(hrs, mins);
            return dt.getTime();
        }
        return 0;
    }
    onChangeOutime(val: string, inTime: boolean) {
        let numIn = 0;
        let numOut = 0;
        try {
            if (inTime) {
                numIn = this.getNumberFromTime(val); //inTime
                numOut = this.getNumberFromTime(this.outTime);
            }
            else {
                numIn = this.getNumberFromTime(this.inTime);
                numOut = this.getNumberFromTime(val); //outTime
            }
        } catch (error) {
            console.error(error);
        }
        if(numOut && numIn)
        {
            let work = numOut - numIn;
            let dtWork:Date = new Date(work);
            this.hours = dtWork.getUTCHours();
            this.minutes = dtWork.getUTCMinutes();
            // console.log("Work:", dtWork.getUTCHours(), dtWork.getUTCMinutes());
        }
        else{
            this.hours = 0;
            this.minutes = 0;
            // console.log("Work:", 0, 0);
        }
    }
}