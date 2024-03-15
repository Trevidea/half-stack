import { Collection, Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";

export class MetaTypeCollectionStrategyView implements Views.Datasource {

    id: number;


    private _metatype: Range<MetatypeView>;
    public get metatype(): Range<MetatypeView> {
        if (!this._metatype) {
            this._metatype = new Range<MetatypeView>();
        }
        return this._metatype;
    }
    public set metatype(v: Range<MetatypeView>) {
        this._metatype = v;
    }


}

export class MetatypeView {

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

    private _values: string[];
    public get values(): string[] {

        return this._values;
    }
    public set values(v: string[]) {
        this._values = v;
    }


}