import { Collection, Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/sport-pip-capture-interface";



export class ConnectionObjecView implements Views.Datasource {
    id: number;

    private _Connection: Collection<PreviousConnectionView>;
    public get Connection(): Collection<PreviousConnectionView> {
        if (!this._Connection) {
            this._Connection = new Collection<PreviousConnectionView>()
        }
        return this._Connection;
    }
    public set Connection(v: Collection<PreviousConnectionView>) {
        this._Connection = v;
    }

}
export class PreviousConnectionView implements Views.Datasource {
    id: number;


    private _userId: number;
    public get userId(): number {
        return this._userId;
    }
    public set userId(v: number) {
        this._userId = v;
    }


    private "_Network Quality": string;
    public get "Network Quality"(): string {
        return this["_Network Quality"];
    }
    public set "Network Quality"(v: string) {
        this["_Network Quality"] = v;
    }


    private "_IP Address": string;
    public get "IP Address"(): string {
        return this["_IP Address"];
    }
    public set "IP Address"(v: string) {
        this["_IP Address"] = v;
    }


    private _Time: string;
    public get Time(): string {
        return this._Time;
    }
    public set Time(v: string) {
        this._Time = v;
    }

    private "_Connection Date": string;
    public get "Connection Date"(): string {
        return this["_Connection Date"];
    }
    public set "Connection Date"(v: string) {
        this["_Connection Date"] = v;
    }


}