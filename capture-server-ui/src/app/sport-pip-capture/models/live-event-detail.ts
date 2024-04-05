import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class LiveEventDetailData extends DataBase<Data.LiveEventDetail> {



    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }


    public get role(): string {
        return this._model.role;
    }
    public set role(v: string) {
        this._model.role = v;
    }


    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }

    public get userId(): number {
        return this._model.userId;
    }
    public set userId(v: number) {
        this._model.userId = v;
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
        return this._model.deviceType;
    }
    public set deviceType(v: string) {
        this._model.deviceType = v;
    }


    public get network(): string {
        return this._model.network;
    }
    public set network(v: string) {
        this._model.network = v;
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


    private _trasnsmitStatus: string;
    public get trasnsmitStatus(): string {
        return this._trasnsmitStatus;
    }
    public set trasnsmitStatus(v: string) {
        this._trasnsmitStatus = v;
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

}
// location: string;
// userId: number;
// deviceId: string;
// deviceType: string;
// network: string;
// quality: string;
// ipAddress: string
// trasnsmitStatus: string;
// received: string;
// retries:string; 