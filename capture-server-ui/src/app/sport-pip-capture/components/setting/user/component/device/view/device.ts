import { Collection, Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class DeviceViewRange implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _deviceView: Range<DeviceView>;
    public get deviceView(): Range<DeviceView> {
        if (!this._deviceView) {
            this._deviceView = new Range<DeviceView>();
        }
        return this._deviceView;
    }
    public set deviceView(v: Range<DeviceView>) {
        this._deviceView = v;
    }

}

export class DeviceView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _deviceName: string;
    public get deviceName(): string {
        return this._deviceName;
    }
    public set deviceName(v: string) {
        this._deviceName = v;
    }

   
    private _deviceType : string;
    public get deviceType() : string {
        return this._deviceType;
    }
    public set deviceType(v : string) {
        this._deviceType = v;
    }
    

    private _deviceCode: string;
    public get deviceCode(): string {
        return this._deviceCode;
    }
    public set deviceCode(v: string) {
        this._deviceCode = v;
    }
}