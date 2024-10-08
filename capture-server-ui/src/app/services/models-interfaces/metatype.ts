import { Data } from "./full-stack-interface";
import { DataBase } from "./model";

export class MetaTypeModel extends DataBase<Data.MetaType> {
    
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
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

