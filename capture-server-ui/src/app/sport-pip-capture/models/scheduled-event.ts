import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class ScheduledEventData extends DataBase<Data.ScheduledEvent>{

    public get event_id(): number {
        return this._model.event_id;
    }
    public set event_id(v: number) {
        this._model.event_id = v;
    }

    public get on_premise(): boolean {
        return this._model.on_premise;
    }
    public set on_premise(v: boolean) {
        this._model.on_premise = v;
    }

    public get pin(): string {
        return this._model.pin;
    }
    public set pin(v: string) {
        this._model.pin = v;
    }

}