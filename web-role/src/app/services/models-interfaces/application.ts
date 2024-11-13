
import { Data } from "./half-stack-interface";
import { DataBase } from "./model";

export class ApplicationData extends DataBase<Data.Application> {

    public get app_name(): string {
        return this._model.app_name;
    }
    public set app_name(v: string) {
        this._model.app_name = v;
    }


}
