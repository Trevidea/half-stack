import { Views } from "src/app/services/models-interfaces/half-stack-interface";
import { Range } from "src/app/blocks/collection";

export class RangePreviousConnection implements Views.Datasource {
  
    
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
    private _PreviousConnections: Range<PreviousConnectionView>;
    public get PreviousConnections(): Range<PreviousConnectionView> {
        if (!this._PreviousConnections) {
            this._PreviousConnections = new Range<PreviousConnectionView>();
        }
        return this._PreviousConnections;
    }
    public set PreviousConnections(v: Range<PreviousConnectionView>) {
        this._PreviousConnections = v;
    }

}

export class PreviousConnectionView implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    
    private _eventName : string;
    public get eventName() : string {
        return this._eventName;
    }
    public set eventName(v : string) {
        this._eventName = v;
    }
    
    private _date: string;
    public get date(): string {
        return this._date;
    }
    public set date(v: string) {
        this._date = v;
    }

    private _totalonnections: string;
    public get totalonnections(): string {
        return this._totalonnections;
    }
    public set totalonnections(v: string) {
        this._totalonnections = v;
    }

    private _duration: string;
    public get duration(): string {
        return this._duration;
    }
    public set duration(v: string) {
        this._duration = v;
    }

    private _mostonnectedDevice: string;
    public get mostonnectedDevice(): string {
        return this._mostonnectedDevice;
    }
    public set mostonnectedDevice(v: string) {
        this._mostonnectedDevice = v;
    }
}