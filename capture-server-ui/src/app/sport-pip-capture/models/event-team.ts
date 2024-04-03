import { DataBase } from "./model";
import { Data } from "./capture-interface";

export class EventTeamData extends DataBase<Data.EventTeam>{

    public get eventId(): number {
        return this._model.eventId;
    }
    public set eventId(v: number) {
        this._model.eventId = v;
    }

    public get teamId(): number {
        return this._model.teamId;
    }
    public set teamId(v: number) {
        this._model.teamId = v;
    }

    
    public get contact() : string {
        return this._model.contact;
    }
    public set contact(v : string) {
        this._model.contact = v;
    }
    
    
    public get phone() : string {
        return this._model.phone;
    }
    public set phone(v : string) {
        this._model.phone = v;
    }
    
    
    public get email() : string {
        return this._model.email;
    }
    public set email(v : string) {
        this._model.email = v;
    }
    
}