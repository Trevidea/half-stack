import { Collection } from "src/app/blocks/collection";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";



export class DeviceFormView implements Views.Datasource {

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



    private _type: Collection<string>;
    public get type(): Collection<string> {
        if (!this._type) {
            this._type = new Collection<string>();
        }
        return this._type;
    }
    public set type(v: Collection<string>) {
        this._type = v;
    }


    private _deviceCode: string;
    public get deviceCode(): string {
        return this._deviceCode;
    }
    public set deviceCode(v: string) {
        this._deviceCode = v;
    }

    
    private _pin : string;
    public get pin() : string {
        return this._pin;
    }
    public set pin(v : string) {
        this._pin = v;
    }
    
}