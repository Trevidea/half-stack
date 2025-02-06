import { Data } from "./half-stack-interface";

export class DataBase<T extends Data.Base> {
    protected _model: T;
      public get id() : number {
        return this._model.id;
    }
    public set id(v : number) {
        this._model.id = v;
    }
    
    constructor(m: T) {
        this._model = m;
    }
}