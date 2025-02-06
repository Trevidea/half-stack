import { Data } from "./half-stack-interface";
import { DataBase } from "./model";


export class DeviceData extends DataBase<Data.Device> {

    public get type(): string {
        return this._model.type;
    }
    public set type(v: string) {
        this._model.type = v;
    }

    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }

    public get code(): string {
        return this._model.code;
    }
    public set code(v: string) {
        this._model.code = v;
    }

    public get pin(): string {
        return this._model.pin;
    }
    public set pin(v: string) {
        this._model.pin = v;
    }

    public get ip_add(): string {
        return this._model.ip_add;
    }
    public set ip_add(v: string) {
        this._model.ip_add = v;
    }

}