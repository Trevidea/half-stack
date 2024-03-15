import { DataBase } from "./model-base";
import { Data } from "./payroll-interface";

export class AttendanceModel extends DataBase<Data.Attendance> {

    public get dt_day():string {
        return this._model["dt_day"];
    }
    public get in_time_str():string {
        return this._model["in_time_str"];
    }
    public get out_time_str():string {
        return this._model["out_time_str"];
    }

    public get year(): number {
        return this._model.year;
    }
    public set year(v: number) {
        this._model.year = v;
    }


    public get month(): number {
        return this._model.month;
    }
    public set month(v: number) {
        this._model.month = v;
    }


    public get working_day(): boolean {
        return this._model.working_day;
    }
    public set working_day(v: boolean) {
        this._model.working_day = v;
    }


    public get weekly_off(): boolean {
        return this._model.weekly_off;
    }
    public set weekly_off(v: boolean) {
        this._model.weekly_off = v;
    }


    public get holiday(): boolean {
        return this._model.holiday;
    }
    public set holiday(v: boolean) {
        this._model.holiday = v;
    }


    public get dt_attendance(): string {
        return this._model.dt_attendance;
    }
    public set dt_attendance(v: string) {
        this._model.dt_attendance = v;
    }


    public get hours(): number {
        return this._model.hours;
    }
    public set hours(v: number) {
        this._model.hours = v;
    }


    public get minutes(): number {
        return this._model.minutes;
    }
    public set minutes(v: number) {
        this._model.minutes = v;
    }


    public get code(): string {
        return this._model.code;
    }
    public set code(v: string) {
        this._model.code = v;
    }


    public get out_time(): string {
        return this._model.out_time;
    }
    public set out_time(v: string) {
        this._model.out_time = v;
    }


    public get in_time(): string {
        return this._model.in_time;
    }
    public set in_time(v: string) {
        this._model.in_time = v;
    }


    public get edited(): boolean {
        return this._model.edited;
    }
    public set edited(v: boolean) {
        this._model.edited = v;
    }

    
}