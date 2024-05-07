import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class RelayStramData extends DataBase<Data.RelayStream> {
  private _eventName: string;
  public get eventName(): string {
    return this._model.eventName;
  }
  public set eventName(v: string) {
    this._model.eventName = v;
  }

  private _eventId: number;
  public get eventId(): number {
    return this._model.eventId;
  }
  public set eventId(v: number) {
    this._model.eventId = v;
  }

  private _sharedWith: Data.SharedWith[];
  public get sharedWith(): Data.SharedWith[] {
    return this._model.sharedWith;
  }
  public set sharedWith(v: Data.SharedWith[]) {
    this._model.sharedWith = v;
  }
}
