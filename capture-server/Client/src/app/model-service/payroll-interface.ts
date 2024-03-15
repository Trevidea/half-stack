import { EventEmitter, Type } from "@angular/core";

export namespace Data {
    // export interface Serializer {
    //     Delete(): void;
    //     serialize(response: { (through: boolean): void }): void;
    // }

    export interface Base {
        id: number;
        _path?: number;
    }
    export interface MetaType extends Base {
        name: string,
        key: string,
        values: string[]
    }
    export interface Employee extends Base {
        dt_joining: string,
        weekly_off: number,
        last_name: string,
        designation: string,
        department: string,
        holiday_cat: string,
        code: string,
        first_name: string,
        paid_alc: number,
        sick_alc: number,
        paid_bal: number,
        sick_bal: number,
        in_time: number,
        out_time: number
    }
    export interface PayrollEmployee extends Base {
        employeeid: number,
        payrollid: number,
        hrarate: number,
        conveyanceallowance: number,
        medicalallowance: number,
        epfrate: number,
        ctc: number,
        basicrate: number,
        designation: string,
        bank: string,
        bankaccountnumber: string,
        pan: string
    }

    export interface SalaryRate extends Base{
        dt_wef:string
        employee_id: number,
        hra_rate: number,
        conveyance_all: number,
        medical_all: number,
        epf_rate: number,
        ctc: number,
        basic_rate: number,
        designation: string,
        bank: string,
        bank_acc_number: string,
        pan: string
    }


    export interface Holiday extends Base {
        dt_holiday: string,
        category: string,
        year: number
        name: string
    }

    export interface Payroll extends Base {
        month: number,
        year: number,
        dt_processed: string
    }

    export interface PayrollAttendance extends Base {
        employeeid: number,
        payrollid: number,
        totalsalarydays: number,
        attendedsalarydays: number,
        paidleaves: number,
        sickleaves: number,
        paidbal: number,
        sickbal: number,
        lossofpaydays: number,
        latearrivals: number,
        earlydepartures: number,
        avghours: number
    }

    export interface MonthlyAttendance extends Base{
        employee_id: number,
        payroll_id: number,
        total_salary_days: number,
        attended_salary_days: number,
        paid_leaves: number,
        sick_leaves: number,
        cumm_paid_bal: number,
        cumm_sick_bal:number,
        loss_of_paydays: number,
        late_arrivals: number,
        early_departures: number,
        avg_hours: number

       

    }

    export interface Attendance extends Base {
        year: number,
        month: number,
        working_day: boolean,
        weekly_off: boolean,
        holiday: boolean,
        dt_attendance: string,
        hours: number,
        minutes: number,
        code: string,
        out_time: string,
        in_time: string,
        edited:boolean
    }

    export interface Privilege extends Base {
        employee_id: number,
        payroll_id: number,
        count: number,
        description: string
    }
    export interface SickLeave extends Base {
        employee_id: number,
        dt_application: string,
        dt_from: string,
        count: number,
        medical_doc: string
        description: string
    }
    export interface Leave extends Base {
        employeeid: number,
        payrollid: number,
        paidalc: number,
        sickalc: number,
        paidbal: number,
        sickbal: number,
        privilegedleave: number
    }
    export interface Configuration extends Base {
        key: string,
        value: string
    }
    export interface Salary extends Base {
        key: string,
        field: string
    }


   

    export interface MonthlySalary extends Base {

        employee_id: number,
        payroll_id: number,
        basic: number,
        hra: number,
        act_conveyance: number,
        act_medical_all: number,
        act_special_all: number,
        epf: number,
        tds: number,
        advances: number,
        income: number,
        deduction: number,
        net_salary: number
    
       

    }

    export interface PayrollCalculated extends Base {
        employeeid: number,
        payrollid: number,
        basic: number,
        hra: number,
        actconveyance: number,
        actmedicalall: number,
        actspecialall: number,
        epf: number,
        tds: number,
        advances: number,
        income: number,
        deduction: number,
        netsalary: number
    }
    export interface Filter {
        operand1: string;
        operator: number;
        opearnd2: string;
    }
    export interface MetaType extends Base {
        name: string,
        key: string,
        values: string[]
    }
    export interface MetaTypeEgress extends Base {
        newItem: string,
        values: string[]
    }
}
export namespace Views {
    export interface Datasource {
        id: number;

    }
    export interface FormState {
        error: boolean,
        data: any
    }
    export interface FormActions {
        onSave(): void;
        onCancel(): void
    }
    export interface FormModal {
        actions: FormActions;
        setModalActions(onClose: EventEmitter<any>): void;
    }
    export interface ModalHost {
        properties: { [key: string]: any };
        component: Type<Views.FormModal>;
        open(): Promise<any>;
        close(data: any): void;
        dismiss(): void;
    }
    export interface FilterMany {
        field: string;
        values: any[];
    }
    export interface FilterOne {
        field: string;
        value: string;
        outValue: string;
    }
    export interface FilterSmaller {
        field: string
        value: string;
        outValue: string;
    }
    export interface FilterLarger {
        field: string
        value: string;
        outValue: string;
    }
    export interface FilterBetween {
        field: string;
        from: string;
        till: string;
    }
}