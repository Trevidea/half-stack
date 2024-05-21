import { Views } from "app/sport-pip-capture/models/capture-interface";

export class ApplicationView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    
    private _appName : string;
    public get appName() : string {
        return this._appName;
    }
    public set appName(v : string) {
        this._appName = v;
    }
    
}
