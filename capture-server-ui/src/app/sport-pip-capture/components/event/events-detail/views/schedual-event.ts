import { Views } from "app/sport-pip-capture/models/capture-interface";

export class SchedualEventView implements Views.Datasource {
    
    private _id :number;
    public get id() :number {
        return this._id;
    }
    public set id(v :number) {
        this._id = v;
    }
    
}