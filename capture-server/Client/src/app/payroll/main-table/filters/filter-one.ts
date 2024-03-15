import { SelectStringItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";
import { FilterBase } from "./filter-base";

export class FilterOne extends FilterBase implements Views.FilterOne {
    getValue(): string {
        return this._value;
    }
    constructor(name: string, field: string, ctrl:number = 0, cbConvert:any = ((val:string)=>val)) {
        super(name, ctrl, cbConvert);
        this.field = field;
    }
    
    private _value : string;
    public get value() : string {
        if(this._value)
            return this._value
        else
            return null;
    }
    public set value(v : string) {
        this._value = v;
    }
    
}