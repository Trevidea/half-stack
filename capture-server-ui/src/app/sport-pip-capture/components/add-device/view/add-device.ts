import { Collection } from "app/blocks/collection";
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


    private _deviceName: Collection<string>;
    public get deviceName(): Collection<string> {
        if (!this._deviceName) {
            this._deviceName = new Collection<string>();
        }
        return this._deviceName;
    }
    public set deviceName(v: Collection<string>) {
        this._deviceName = v;
    }


    private _pin: string;
    public get pin(): string {
        return this._pin;
    }
    public set pin(v: string) {
        this._pin = v;
    }


    private _location: Collection<string>;
    public get location(): Collection<string> {
        if (!this._location) {
            this._location = new Collection<string>();
        }
        return this._location;
    }
    public set location(v: Collection<string>) {
        this._location = v;
    }


}