import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Collection, Range } from "app/blocks/collection";

export class ConnectionDetailsView implements Views.Datasource {

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _sreamName: string;
  public get sreamName(): string {
    return this._sreamName;
  }
  public set sreamName(v: string) {
    this._sreamName = v;
  }

  private _direction: number;
  public get direction(): number {
    return this._direction;
  }
  public set direction(v: number) {
    this._direction = v;
  }

}