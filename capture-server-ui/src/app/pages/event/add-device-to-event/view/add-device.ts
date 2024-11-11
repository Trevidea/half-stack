import { Collection } from "src/app/blocks/collection";
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";


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


    private _ipAddress: string;
    public get ipAddress(): string {
        return this._ipAddress;
    }
    public set ipAddress(v: string) {
        this._ipAddress = v;
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


    private _streamName: string;
    public get streamName(): string {
        return this._streamName;
    }
    public set streamName(v: string) {
        this._streamName = v;
    }


    private _streamId: string;
    public get streamId(): string {
        return this._streamId;
    }
    public set streamId(v: string) {
        this._streamId = v;
    }


    private _type: Collection<string>;
    public get type(): Collection<string> {
        if (!this._type) {
            return this._type = new Collection<string>();
        }
        return this._type;

    }
    public set type(v: Collection<string>) {
        this._type = v;
    }


    private _taggingPanels: Collection<SelectItemView>;
    public get taggingPanels(): Collection<SelectItemView> {
        if (!this._taggingPanels) {
            return this._taggingPanels = new Collection<SelectItemView>();
        }
        return this._taggingPanels;
    }
    public set taggingPanels(v: Collection<SelectItemView>) {
        this._taggingPanels = v;
    }


}