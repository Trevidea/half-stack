import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class PastConnectionDetailsData extends DataBase<Data.PastConnectionDetails> {
 

    private _stream_name: string;
    public get stream_name(): string {
        return this._model.stream_name;
    }
    public set stream_name(v: string) {
        this._model.stream_name = v;
    }


    private _stream_id: string;
    public get stream_id(): string {
        return this._model.stream_id;
    }
    public set stream_id(v: string) {
        this._model.stream_id = v;
    }


    public get event_id(): number {
        return this._model.event_id;
    }
    public set event_id(v: number) {
        this._model.event_id = v;
    }


    private _direction: number;
    public get direction(): number {
        return this._model.direction;
    }
    public set direction(v: number) {
        this._model.direction = v;
    }


}