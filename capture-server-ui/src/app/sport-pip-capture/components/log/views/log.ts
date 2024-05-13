import { DatePipe } from "@angular/common";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Collection, Range } from "app/blocks/collection";
import { UI } from "app/blocks/ui-utils";
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

  private _categories: Collection<string>;
  public get Categories(): Collection<string> {
    if (!this._categories) {
      this._categories = new Collection<string>();
    }
    return this._categories;
  }
  public set categories(v: Collection<string>) {
    this._categories = v;
  }

  private _category: string;
  public get category(): string {
    return this._category;
  }
  public set category(v: string) {
    this._category = v;
  }

  private _user: string;
  public get user(): string {
    return this._user;
  }
  public set user(v: string) {
    this._user = v;
  }

  private _dateRangeFrom: NgbDate;
  public get dateRangeFrom(): NgbDate {
    // if(!this._dateRangeFrom){
    //   this._dateRangeFrom
    // }
    return this._dateRangeFrom;
  }
  public set dateRangeFrom(v: NgbDate) {
    this._dateRangeFrom = v;
  }

  private _dateRangeTo: NgbDate;
  public get dateRangeTo(): NgbDate {
    return this._dateRangeTo;
  }
  public set dateRangeTo(v: NgbDate) {
    this._dateRangeTo = v;
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
    return DateFormate.formatDate(this._timestamp);
  }
  public set timestamp(v: string) {
    this._timestamp = v;
  }

  private _details: any[];
  public get details(): any[] {
    return this._details;
  }
  public set details(v: any[]) {
    this._details = v;
  }

  private _lapse: string;
  public get lapse(): string {
    return this._lapse;
  }
  public set lapse(v: string) {
    this._lapse = v;
  }

  private _level: string;
  public get level(): string {
    return this._level;
  }
  public set level(v: string) {
    this._level = v;
  }

  private _message: string;
  public get message(): string {
    return this._message;
  }
  public set message(v: string) {
    this._message = v;
  }

  private _tid: string;
  public get tid(): string {
    return this._tid;
  }
  public set tid(v: string) {
    this._tid = v;
  }
}
export class DateFormate {
  static datePipe = new DatePipe("en-US");

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const format = "dd MMMM yyyy 'at' h:mm a";
    return this.datePipe.transform(date, format) || "";
  }
}
