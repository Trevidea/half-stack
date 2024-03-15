import { SelectStringItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";
import { FilterBase } from "./filter-base";

export class FilterSmaller extends FilterBase implements Views.FilterSmaller {
    getValue(): string {
        return this._benchmark;
    }
    constructor(name: string, field: string, ctrl:number = 0, cbConvert:any = ((val:string)=>val), defValue="") {
        super(name, ctrl, cbConvert);
        this.field = field;
        this.value= defValue;
    }
    
    private _benchmark : string;
    public get value() : string {
        if(this._benchmark)
            return this._benchmark
        else
            return null;
    }
    public set value(v : string) {
        this._benchmark = v;
    }
    
}