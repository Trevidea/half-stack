import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class PayrollEmployeeView implements Views.Datasource {
    id: number;


    private _employeeCode : Collection<SelectItemView>;
    public get employeeCode() : Collection<SelectItemView> {
        if(!this._employeeCode){
            this._employeeCode = new Collection<SelectItemView>();
        }
        return this._employeeCode;
    }
    public set employeeCode(v : Collection<SelectItemView>) {
        this._employeeCode = v;
    }

    
    private _payrollId : Collection<SelectItemView>;
    public get payrollId() : Collection<SelectItemView> {
        if(!this._payrollId){
            this._payrollId = new Collection<SelectItemView>();
        }
        return this._payrollId;
    }
    public set payrollId(v : Collection<SelectItemView>) {
        this._payrollId = v;
    }
    
    
    private _designation : string;
    public get designation() : string {
        return this._designation;
    }
    public set designation(v : string) {
        this._designation = v;
    }
    


    private _bank: string;
    public get bank(): string {
        return this._bank;
    }
    public set bank(v: string) {
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

    
    private _ctc : number;
    public get ctc() : number {
        return this._ctc;
    }
    public set ctc(v : number) {
        this._ctc = v;
    }
    

    
    private _basicRate : number;
    public get basicRate() : number {
        return this._basicRate;
    }
    public set basicRate(v : number) {
        this._basicRate = v;
    }
    
    
    private _hraRate : number;
    public get hraRate() : number {
        return this._hraRate;
    }
    public set hraRate(v : number) {
        this._hraRate = v;
    }

    
    private _conveyanceAllowance : number;
    public get conveyanceAllowance() : number {
        return this._conveyanceAllowance;
    }
    public set conveyanceAllowance(v : number) {
        this._conveyanceAllowance = v;
    }
    
    
    private _medAllowance : number;
    public get medAllowance() : number {
        return this._medAllowance;
    }
    public set medAllowance(v : number) {
        this._medAllowance = v;
    }
    
    
    private _epfRate : number;
    public get epfRate() : number {
        return this._epfRate;
    }
    public set epfRate(v : number) {
        this._epfRate = v;
    }
    
    
}