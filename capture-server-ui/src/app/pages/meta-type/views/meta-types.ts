import { Views } from "src/app/services/models-interfaces/half-stack-interface";
import { Collection, Range } from "../../../blocks/collection";


export class MetaTypeView implements Views.Datasource {

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _key: string;
  public get key(): string {
    return this._key;
  }
  public set key(v: string) {
    this._key = v;
  }

  private _value: string[];
  public get value(): string[] {
    // if (!this._value) {
    //     this._value = new Collection<string>();
    // }
    return this._value;
  }
  public set value(v: string[]) {
    this._value = v;
  }

  private _values: Range<TypeView>;
  public get values(): Range<TypeView> {
    if (!this._values) {
      this._values = new Range<TypeView>();
    }
    return this._values;
  }
  public set values(v: Range<TypeView>) {
    this._values = v;
  }

}
export class TypeView implements Views.Datasource {

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }


  private _key: string;
  public get key(): string {
    return this._key;
  }
  public set key(v: string) {
    this._key = v;
  }

  private _value: string[];
  public get value(): string[] {
    return this._value;
  }
  public set value(v: string[]) {
    this._value = v;
  }
}