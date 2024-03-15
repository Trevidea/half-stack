import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class TeamData extends DataBase<Data.Team>{

    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }

    public get logo(): string {
        return this._model.logo;
    }
    public set logo(v: string) {
        this._model.logo = v;
    }

}