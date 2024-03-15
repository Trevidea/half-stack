import { Data } from "./payroll-interface";

export class DataBase<T extends Data.Base> {
    protected _model: T;
    columns(): string[] {
        var _columns: string[] = [];
        Object.entries(this._model).forEach((entry) => {
            const [key, value] = entry;
            _columns.push(key);
        });
        return _columns;
    }
    public get id(): number {
        return this._model.id;
    }
    public set id(v: number) {
        this._model.id = v;
    }

    constructor(m: T) {
        this._model = m;
    }
}
