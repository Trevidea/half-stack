import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class DeviceData extends DataBase<Data.Device> {

    private _type: string;
    public get type(): string {
        return this._model.type;
    }
    public set type(v: string) {
        this._model.type = v;
    }

    private _name: string;
    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }

    private _code: string;
    public get code(): string {
        return this._model.code;
    }
    public set code(v: string) {
        this._model.code = v;
    }

    private _pin: string;
    public get pin(): string {
        return this._pin;
    }
    public set pin(v: string) {
        this._pin = v;
    }



}