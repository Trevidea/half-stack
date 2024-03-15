import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";

export class PrivilegeView implements Views.Datasource {
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

    
    private _count : number;
    public get count() : number {
        return this._count;
    }
    public set count(v : number) {
        this._count = v;
    }
    
    
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
    
}