import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Collection, Range } from "app/blocks/collection";
export class LiveRangeView implements Views.Datasource {


    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _liveView: Range<LiveView>;
    public get liveView(): Range<LiveView> {
        return this._liveView;
    }
    public set liveView(v: Range<LiveView>) {
        this._liveView = v;
    }


}


export class LiveView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }

    private _deviceId: string;
    public get deviceId(): string {
        return this._deviceId;
    }
    public set deviceId(v: string) {
        this._deviceId = v;
    }

    private _deviceType: string;
    public get deviceType(): string {
        return this._deviceType;
    }
    public set deviceType(v: string) {
        this._deviceType = v;
    }

    private _network: string;
    public get network(): string {
        return this._network;
    }
    public set network(v: string) {
        this._network = v;
    }

    private _quality: string;
    public get quality(): string {
        return this._quality;
    }
    public set quality(v: string) {
        this._quality = v;
    }

    private _ipAddress: string;
    public get ipAddress(): string {
        return this._ipAddress;
    }
    public set ipAddress(v: string) {
        this._ipAddress = v;
    }

    private _transmitStatus: string;
    public get transmitStatus(): string {
        return this._transmitStatus;
    }
    public set transmitStatus(v: string) {
        this._transmitStatus = v;
    }

    private _received: string;
    public get received(): string {
        return this._received;
    }
    public set received(v: string) {
        this._received = v;
    }

    private _retries: string;
    public get retries(): string {
        return this._retries;
    }
    public set retries(v: string) {
        this._retries = v;
    }

    private _role: string;
    public get role(): string {
        return this._role;
    }
    public set role(v: string) {
        this._role = v;
    }


}