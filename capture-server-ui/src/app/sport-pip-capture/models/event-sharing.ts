
import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class EventSharingData extends DataBase<Data.EventSharing>{
 
    public get eventId() : number {
        return this._model.eventId;
    }
    public set eventId(v : number) {
        this._model.eventId = v;
    }
    
    public get userId() : number {
        return this._model.userId;
    }
    public set userId(v : number) {
        this._model.userId = v;
    }
    
    public get dtShared() : string {
        return this._model.dtShared;
    }
    public set dtShared(v : string) {
        this._model.dtShared = v;
    }


    
}