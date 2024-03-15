import { Collection, Range } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";

export class EmployeeView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _employeeCode: string;
    public get employeeCode(): string {
        return this._employeeCode;
    }
    public set employeeCode(v: string) {
        this._employeeCode = v;
    }


    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(v: string) {
        this._firstName = v;
    }


    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(v: string) {
        this._lastName = v;
    }

    private _designation: Collection<string>;
    public get designation(): Collection<string> {
        if (!this._designation) {
            this._designation = new Collection<string>();
        }
        return this._designation;
    }
    public set designation(v: Collection<string>) {
        this._designation = v;
    }

    private _department: Collection<string>;
    private _isInitialized: boolean = false;
    public get department(): Collection<string> {
        if (!this._department) {
            this._department = new Collection<string>();
        }
        // if (!this._isInitialized) {
        //     this._department.push('House Kepping');
        //     this._isInitialized = true;
        // }
        return this._department;
    }
    public set department(v: Collection<string>) {
        this._department = v;
    }

    private _joiningDate: string;
    public get joiningDate(): string {
        if (!this._joiningDate) {
            this._joiningDate = UI.DateHelper.apiDateToday()
        }
        return this._joiningDate;
    }
    public set joiningDate(v: string) {
        this._joiningDate = v;
    }

    private _holidays: Collection<string>;
    public get holidays(): Collection<string> {
        if (!this._holidays) {
            this._holidays = new Collection<string>();
        }
        return this._holidays;
    }
    public set holidays(v: Collection<string>) {
        this._holidays = v;
    }

    private _weeklyOff: number;
    public get weeklyOff(): number {
        return this._weeklyOff;
    }
    public set weeklyOff(v: number) {
        this._weeklyOff = v;
    }

    private _bank: Collection<string>;
    public get bank(): Collection<string> {
        if (!this._bank) {
            this._bank = new Collection<string>();
        }
        return this._bank;
    }
    public set bank(v: Collection<string>) {
        this._bank = v;
    }

    private _bankAccountNumber: string;
    public get bankAccountNumber(): string {
        return this._bankAccountNumber;
    }
    public set bankAccountNumber(v: string) {
        this._bankAccountNumber = v;
    }

    private _pan: string;
    public get pan(): string {
        return this._pan;
    }
    public set pan(v: string) {
        this._pan = v;
    }

    private _ctc: number;
    public get ctc(): number {
        return this._ctc;
    }
    public set ctc(v: number) {
        this._ctc = v;
    }

    private _basicRate: number;
    public get basicRate(): number {
        return this._basicRate;
    }
    public set basicRate(v: number) {
        this._basicRate = v;
    }

    private _hraRate: number;
    public get hraRate(): number {
        return this._hraRate;
    }
    public set hraRate(v: number) {
        this._hraRate = v;
    }

    private _conveyanceAllowance: number;
    public get conveyanceAllowance(): number {
        return this._conveyanceAllowance;
    }
    public set conveyanceAllowance(v: number) {
        this._conveyanceAllowance = v;
    }

    private _medicalAllowance: number;
    public get medicalAllowance(): number {
        return this._medicalAllowance;
    }
    public set medicalAllowance(v: number) {
        this._medicalAllowance = v;
    }

    private _epfRate: number;
    public get epfRate(): number {
        return this._epfRate;
    }
    public set epfRate(v: number) {
        this._epfRate = v;
    }

    private _paidAllocated: number;
    public get paidAllocated(): number {
        return this._paidAllocated;
    }
    public set paidAllocated(v: number) {
        this._paidAllocated = v;
    }

    private _sickAllocated: number;
    public get sickAllocated(): number {
        return this._sickAllocated;
    }
    public set sickAllocated(v: number) {
        this._sickAllocated = v;
    }

    private _paidBalance: number;
    public get paidBalance(): number {
        return this._paidBalance;
    }
    public set paidBalance(v: number) {
        this._paidBalance = v;
    }

    private _sickBalance: number;
    public get sickBalance(): number {
        return this._sickBalance;
    }
    public set sickBalance(v: number) {
        this._sickBalance = v;
    }
    
    private _workHrsIn : string;
    public get workHrsIn() : string {
        return this._workHrsIn;
    }
    public set workHrsIn(v : string) {
        this._workHrsIn = v;
    }
    
    private _workHrsOut : string;
    public get workHrsOut() : string {
        return this._workHrsOut;
    }
    public set workHrsOut(v : string) {
        this._workHrsOut = v;
    }

 
    
}