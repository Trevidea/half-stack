import { Views } from "app/sport-pip-capture/models/capture-interface";

export class EventUploadAuthView implements Views.Datasource {

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

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(v: string) {
        this._password = v;
    }

    
    private _serverIdentity : string;
    public get serverIdentity() : string {
        return this._serverIdentity;
    }
    public set serverIdentity(v : string) {
        this._serverIdentity = v;
    }
    

}