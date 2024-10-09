import { Data } from "./full-stack-interface";
import { DataBase } from "./model";

export class TeamData extends DataBase<Data.Team>{

    
    public get id() : number {
        return this._model.id;
    }
    public set id(v : number) {
        this._model.id = v;
    }
    

    public get name() : string {
        return this._model.name;
    }
    public set name(v : string) {
        this._model.name = v;
    }
    
    public get logo() : string {
        return this._model.logo;
    }
    public set logo(v : string) {
        this._model.logo = v;
    }
    
    
    public get sport() : string {
        return this._model.sport;
    }
    public set sport(v : string) {
        this._model.sport = v;
    }
    
    public get level() : string {
        return this._model.level;
    }
    public set level(v : string) {
        this._model.level = v;
    }
    
    
    public get program() : string {
        return this._model.program;
    }
    public set program(v : string) {
        this._model.program = v;
    }
    
    
    public get year() : string {
        return this._model.year;
    }
    public set year(v : string) {
        this._model.year = v;
    }
    

    public get social_links() : Data.SocialLinks {
        return this._model.social_links;
    }
    public set social_links(v : Data.SocialLinks) {
        this._model.social_links = v;
    }
    

    public get stats() : Data.TeamStats {
        return this._model.stats;
    }
    public set stats(v : Data.TeamStats) {
        this._model.stats = v;
    }
    
}