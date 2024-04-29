import { Views } from "app/sport-pip-capture/models/capture-interface";

export class AddDeviceView implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

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


    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }


}