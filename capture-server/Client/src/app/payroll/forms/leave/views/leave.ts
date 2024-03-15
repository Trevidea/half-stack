import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class LeaveView implements Views.Datasource {
    id: number;

    private _employeeCode: Collection<SelectItemView>;
    public get employeeCode(): Collection<SelectItemView> {
        if (!this._employeeCode) {
            this._employeeCode = new Collection<SelectItemView>();
        }
        return this._employeeCode;
    }
    public set employeeCode(v: Collection<SelectItemView>) {
        this._employeeCode = v;
    }


    private _payrollId: Collection<SelectItemView>;
    public get payrollId(): Collection<SelectItemView> {
        if (!this._payrollId) {
            this._payrollId = new Collection<SelectItemView>();
        }
        return this._payrollId;
    }
    public set payrollId(v: Collection<SelectItemView>) {
        this._payrollId = v;
    }


    private _paidLeaveTaken: number;
    public get paidLeaveTaken(): number {
        return this._paidLeaveTaken;
    }
    public set paidLeaveTaken(v: number) {
        this._paidLeaveTaken = v;
    }


    private _sickLeaveTaken: number;
    public get sickLeaveTaken(): number {
        return this._sickLeaveTaken;
    }
    public set sickLeaveTaken(v: number) {
        this._sickLeaveTaken = v;
    }


    private _paidLeaveBalance: number;
    public get paidLeaveBalance(): number {
        return this._paidLeaveBalance;
    }
    public set paidLeaveBalance(v: number) {
        this._paidLeaveBalance = v;
    }


    private _sickLeaveBalance: number;
    public get sickLeaveBalance(): number {
        return this._sickLeaveBalance;
    }
    public set sickLeaveBalance(v: number) {
        this._sickLeaveBalance = v;
    }

    private _privilegeLeave: number;
    public get privilegeLeave(): number {
        return this._privilegeLeave;
    }
    public set privilegeLeave(v: number) {
        this._privilegeLeave = v;
    }

}