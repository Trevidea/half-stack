import { Collection } from "src/app/blocks/collection";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";


export class ApplicationView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _appName: string;
    public get appName(): string {
        return this._appName;
    }
    public set appName(v: string) {
        this._appName = v;
    }

    private _applicationName: Collection<string>;
    public get applicationName(): Collection<string> {
        if (!this._applicationName) {
            this._applicationName = new Collection();
        }
        return this._applicationName;
    }
    public set applicationName(v: Collection<string>) {
        this._applicationName = v;
    }

}

