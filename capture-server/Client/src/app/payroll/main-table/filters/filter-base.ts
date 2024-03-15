import { Collection } from "src/app/blocks/collection";
import { SelectStringItemView } from "src/app/blocks/collection-item";

export abstract class FilterBase {
    controlType:number;
    cbConvert:any;
  length: number;
    constructor(name:string, ctrl:number = 0, cbConvert:any = ((val:string)=>val))
    {
        this.cbConvert = cbConvert;
        this.controlType = ctrl;
        this.name = name
    }           
    
    private _datasource : Collection<SelectStringItemView>;
    public get datasource() : Collection<SelectStringItemView> {
        if(!this._datasource)
        {
            this.datasource = new Collection<SelectStringItemView>();
        }
        return this._datasource;
    }
    public set datasource(v : Collection<SelectStringItemView>) {
        this._datasource = v;
    }
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    
    private _field : string;
    public get field() : string {
        return this._field;
    }
    public set field(v : string) {
        this._field = v;
    }
    
    abstract getValue():string;
    public get outValue() : string {
        const value = this.getValue();
        if(value)
            return this.cbConvert(value);
        else
            return null;
    }
    
    
}