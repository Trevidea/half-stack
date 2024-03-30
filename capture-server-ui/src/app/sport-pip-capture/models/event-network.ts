import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class EventNetWorkData extends DataBase<Data.EventNetWork>{

    public get eventId(): number {
        return this._model.eventId;
    }

    public set eventId(v: number) {
        this._model.eventId = v;
    }

    public get network(): string {
        return this._model.network;
    }
    public set network(v: string) {
        this._model.network = v;
    }
    

}