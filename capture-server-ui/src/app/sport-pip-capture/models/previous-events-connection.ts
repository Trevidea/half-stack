import { DataBase } from "./model";
import { Data } from "./sport-pip-capture-interface";

export class PreviousEventsConnectionData extends DataBase<Data.PreviousEventsConnection>{





    public get userId(): number {
        return this._model.userId;
    }
    public set userId(v: number) {
        this._model.userId = v;
    }


    private _NetworkQuality: string = "abc";
    public get "Network Quality"(): string {
        return this._model["Network Quality"];
    }
    public set "Network Quality"(v: string) {
        this._model["Network Quality"] = v;
    }

    public get "IP Address"(): string {
        return this._model["IP Address"];
    }
    public set "IP Address"(v: string) {
        this._model["IP Address"] = v;
    }


    private _Time: string;
    public get Time(): string {
        return this._model.Time;
    }
    public set Time(v: string) {
        this._model.Time = v;
    }


    public get "Connection Date"(): string {
        return this._model["Connection Date"];
    }
    public set "Connection Date"(v: string) {
        this._model["Connection Date"] = v;
    }

}
/*

        
        "Is Disabled": boolean,
        "Type": string,
        "Connection Date": string,
        "Priority": string,
        "Location": string,
        "First Name": string,
        "Last Name": string,
        "Email": string,
        "Phone": string,
        "Role": string,
        "Address": string,
        "eventId": number,
        "Shared Date": string,
        "Team Name": string,
        "detail": [
            {
                "cityAddress": string,
                "streetAdress": string,
                "type": string
            }
        ],
        "Event Date": string,
        "Level": string,
        "Day Halve": string,
        "onPremise": boolean,
        "Program": string,
        "Sport": string,
        "Time": string,
        "Year": number,
        "venue": [
            {
                "location": string
            }
        ],
        "Status": string
*/