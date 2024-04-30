import { Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class LogRangeView implements Views.Datasource {
  id: number;
  private _logs: Range<LogView>;
  public get logs(): Range<LogView> {
    if (!this._logs) {
      this._logs = new Range<LogView>();
    }
    return this._logs;
  }
  public set logst(v: Range<LogView>) {
    this._logs = v;
  }
}

export class LogView implements Views.Datasource {
  id: number;

  private _category: string;
  public get category(): string {
    return this._category;
  }
  public set category(v: string) {
    this._category = v;
  }

  private _subject: string;
  public get subject(): string {
    return this._subject;
  }
  public set subject(v: string) {
    this._subject = v;
  }

  private _user: string;
  public get user(): string {
    return this._user;
  }
  public set user(v: string) {
    this._user = v;
  }

  private _action: string;
  public get action(): string {
    return this._action;
  }
  public set action(v: string) {
    this._action = v;
  }

  private _timestamp: string;
  public get timestamp(): string {
    return this._timestamp;
  }
  public set timestamp(v: string) {
    this._timestamp = v;
  }
}

/*
  category: string,
  subject: string,
  user: string,
  action: string,
  timestamp: string,
*/
