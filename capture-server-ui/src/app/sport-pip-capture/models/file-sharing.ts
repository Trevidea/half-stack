import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class FileSharingData extends DataBase<Data.FileSharing>{

    public get fileId() : number {
        return this._model.fileId;
    }
    public set fileId(v : number) {
        this._model.fileId = v;
    }

    public get distributionId() : number[] {
        return this._model.distributionId;
    }
    public set distributionId(v : number[]) {
        this._model.distributionId = v;
    }
    
    public get dtShared() : string {
        return this._model.dtShared;
    }
    public set dtShared(v : string) {
        this._model.dtShared = v;
    }
    
    
}