import { Collection } from "app/blocks/collection";
import { SelectItemView } from "app/blocks/collection-item";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class AddDeviceView implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _appName: string;
    public get appName(): string {
        return this._appName;
    }
    public set appName(v: string) {
        this._appName = v;
    }



    private _appNamesCollection: Collection<string>;
    public get appNamesCollection(): Collection<string> {
        if (!this._appNamesCollection) {
            this._appNamesCollection = new Collection<string>()
        }
        return this._appNamesCollection;
    }
    public set appNamesCollection(v: Collection<string>) {
        this._appNamesCollection = v;
    }



    private _userName: Collection<SelectItemView>;
    public get userName(): Collection<SelectItemView> {
        if (!this._userName) {
            this._userName = new Collection<SelectItemView>()
        }
        return this._userName;
    }
    public set userName(v: Collection<SelectItemView>) {
        this._userName = v;
    }


    private _deviceName: Collection<SelectItemView>;
    public get deviceName(): Collection<SelectItemView> {
        if (!this._deviceName) {
            this._deviceName = new Collection<SelectItemView>();
        }
        return this._deviceName;
    }
    public set deviceName(v: Collection<SelectItemView>) {
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



    private _eventId: number;
    public get eventId(): number {
        return this._eventId;
    }
    public set eventId(v: number) {
        this._eventId = v;
    }


}