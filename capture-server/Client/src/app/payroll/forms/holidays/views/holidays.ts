import { Collection } from "src/app/blocks/collection";
import { UI } from "src/app/blocks/ui-utils";
import { Views } from "src/app/model-service/payroll-interface";

export class HolidaysViews implements Views.Datasource {

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

    private _year: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }


    private _categories: Collection<string>;
    public get categories(): Collection<string> {
        if (!this._categories) {
            this._categories = new Collection<string>();
        }
        return this._categories;
    }
    public set categories(v: Collection<string>) {
        this._categories = v;
    }


    private _dateOfHoliday: string;
    public get dateOfHoliday(): string {
        if (!this._dateOfHoliday) {
            this._dateOfHoliday = UI.DateHelper.apiDateToday()
        }
        return this._dateOfHoliday;
    }
    public set dateOfHoliday(v: string) {
        this._dateOfHoliday = v;
    }


}