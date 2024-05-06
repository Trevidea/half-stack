import { Views } from "app/sport-pip-capture/models/capture-interface";

import { Collection, Range } from "app/blocks/collection";

export class RelayStreamView implements Views.Datasource {
  id: number;

  private _eventName: string;
  public get eventName(): string {
    return this._eventName;
  }
  public set eventName(v: string) {
    this._eventName = v;
  }

  private _eventId: number;
  public get eventId(): number {
    return this._eventId;
  }
  public set eventId(v: number) {
    this._eventId = v;
  }

  private _sharedWith: Range<SharedWithView>;
  public get sharedWith(): Range<SharedWithView> {
    return this._sharedWith;
  }
  public set sharedWith(v: Range<SharedWithView>) {
    this._sharedWith = v;
  }
}

export class SharedWithView implements Views.Datasource {
  id: number;

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _url: string;
  public get url(): string {
    return this._url;
  }
  public set url(v: string) {
    this._url = v;
  }
}
