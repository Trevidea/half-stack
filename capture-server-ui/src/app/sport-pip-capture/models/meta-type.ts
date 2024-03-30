import { DataBase } from "./model";
import { Data } from "./capture-interface";


export class MetaTypeData extends DataBase<Data.MetaType> {
    public get key() : string {
        return this._model.key;
    }
    public set key(v : string) {
        this._model.key = v;
    }
    
    public get name() : string {
        return this._model.name;
    }
    public set name(v : string) {
        this._model.name = v;
    }
    
    public get values() : string[] {
        return this._model.values;
    }
    public set values(v : string[]) {
        this._model.values = v;
    }
    constructor(model: Data.MetaType) {
        super(model);
    }
}

export class MetaTypeEgressData extends DataBase<Data.MetaTypeEgress> {
    
    private _newItem : string;
    public get newItem() : string {
        console.log(this._newItem)
        return this._newItem;
    }
    public set newItem(v : string) {
        this._newItem = v;
    }
    public get values() : string[] {
        return this._model.values;
    }
    public set values(v : string[]) {
        this._model.values = v;
    }
    constructor(model: Data.MetaTypeEgress) {
        super(model);
    }
    
}