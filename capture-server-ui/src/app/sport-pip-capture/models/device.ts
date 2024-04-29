import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class DeviceData extends DataBase<Data.Device> {

    private _userName: string;
    public get userName(): string {
        return this._userName;
    }
    public set userName(v: string) {
        this._userName = v;
    }

    private _deviceName: string;
    public get deviceName(): string {
        return this._deviceName;
    }
    public set deviceName(v: string) {
        this._deviceName = v;
    }

    private _pin: string;
    public get pin(): string {
        return this._pin;
    }
    public set pin(v: string) {
        this._pin = v;
    }

}