import { Collection } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class headerView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _sports: Collection<string>;
    public get sports(): Collection<string> {
        if (!this._sports) {
            this._sports = new Collection<string>();
        }
        return this._sports;
    }
    public set sports(v: Collection<string>) {
        this._sports = v;
    }
    private _programs: Collection<string>;
    public get programs(): Collection<string> {
        if (!this._programs) {
            this._programs = new Collection<string>();
        }
        return this._programs;
    }
    public set programs(v: Collection<string>) {
        this._programs = v;
    }



    private _levels: Collection<string>;
    public get levels(): Collection<string> {
        if (!this._levels) {
            this._levels = new Collection<string>();
        }
        return this._levels;
    }
    public set levels(v: Collection<string>) {
        this._levels = v;
    }

    private _years: Collection<string>;
    public get years(): Collection<string> {
        if (!this._years) {
            this._years = new Collection<string>();
        }
        return this._years;
    }
    public set years(v: Collection<string>) {
        this._years = v;
    }

 
    
    private _status : string;
    public get status() : string {
        return this._status;
    }
    public set status(v : string) {
        this._status = v;
    }
    

}