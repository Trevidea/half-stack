import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class EventUploadAuthData extends DataBase<Data.EventUploadAuth> {

    public get username(): string {
        return this._model.username;
    }
    public set username(v: string) {
        this._model.username = v;
    }

    public get password(): string {
        return this._model.password;
    }
    public set password(v: string) {
        this._model.password = v;
    }

    private _server_identity: string;
    public get serverI_ientity(): string {
        return this._server_identity;
    }
    public set serverIdentity(v: string) {
        this._server_identity = v;
    }


}