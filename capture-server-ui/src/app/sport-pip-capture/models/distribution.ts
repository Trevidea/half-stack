import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class DistributionData extends DataBase<Data.Distribution>{
 

    public get name(): string {
        return this._model.name;
    }
    public set name(v: string) {
        this._model.name = v;
    }
    
    public get emails() : Data.Emails[] {
        return this._model.emails;
    }   
    public set emails(v : Data.Emails[]) {
        this._model.emails = v;
    }
}