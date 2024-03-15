import { SelectStringItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/model-service/payroll-interface";
import { FilterBase } from "./filter-base";

export class FilterOneSelect extends FilterBase implements Views.FilterOne {
    getValue(): string {
        return this.value;
    }
    constructor(name: string, field: string, ctrl:number = 0, cbConvert:any = ((val:string)=>val), defValue="") {
        super(name, ctrl, cbConvert);
        this.field = field;
        this.value = defValue
    }
    private _value: string;
    public get value(): string {
        return this.datasource.SelectedItem?`${this.datasource.SelectedItem?.key}`:null;
    }
    public set value(v: string) {
        this.datasource.Select((item: SelectStringItemView) => item.value == v)
    }
}