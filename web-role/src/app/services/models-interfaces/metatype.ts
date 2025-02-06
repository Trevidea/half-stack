
import { Data } from "./half-stack-interface";
import { DataBase } from "./model";

export class MetaTypeData extends DataBase<Data.MetaType> {

    public override get id(): number {
        return this._model.id;
    }
    public override set id(v: number) {
        this._model.id = v;
    }

    public get key(): string {
        return this._model.key;
    }
    public set key(v: string) {
        this._model.key = v;
    }

    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }

    public get values(): string[] {
        return this._model.values;
    }
    public set values(v: string[]) {
        this._model.values = v;
    }
    constructor(model: Data.MetaType) {
        super(model);
    }
}

