import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class OnDemandEventData extends DataBase<Data.OnDemandEvent>{
    
    public get event_id() :number {
        return this._model.event_id;
    }
    public set event_id(v :number) {
        this._model.event_id = v;
    }

    public get owner_id() : number {
        return this._model.owner_id;
    }
    public set owner_id(v : number) {
        this._model.owner_id = v;
    }
    
    
}