import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class LogData extends DataBase<Data.Log> {
  private _category: string;
  public get category(): string {
    return this._model.category;
  }
  public set category(v: string) {
    this._model.category = v;
  }

  private _subject: string;
  public get subject(): string {
    return this._model.subject;
  }
  public set subject(v: string) {
    this._model.subject = v;
  }

  private _user: string;
  public get user(): string {
    return this._model.user;
  }
  public set user(v: string) {
    this._model.user = v;
  }

  private _action: string;
  public get action(): string {
    return this._model.action;
  }
  public set action(v: string) {
    this._model.action = v;
  }

  private _timestamp: string;
  public get timestamp(): string {
    return this._model.timestamp;
  }
  public set timestamp(v: string) {
    this._model.timestamp = v;
  }
}

/*
   category: string;
    subject: string;
    user: string;
    action: string;
    timestamp: string;
*/
