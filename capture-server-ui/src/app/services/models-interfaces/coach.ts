import { Data } from "./full-stack-interface";
import { DataBase } from "./model";

export class CoachData extends DataBase<Data.Coach> {
  
  
    public override get id() : number {
        return this._model.id;
   }
    public override set id(v : number) {
        this._model.id = v;
    }
    
    
    public get sport() : string {
        return this._model.sport;
    }
    public set sport(v : string) {
        this._model.sport = v;
    }
    
    
    public get title() : string {
        return this._model.title;
    }
    public set title(v : string) {
        this._model.title = v;
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

    
    public get first_name() : string {
        return this._model.first_name;
    }
    public set first_name(v : string) {
        this._model.first_name = v;
    }
    
    public get last_name() : string {
        return this._model.last_name;
    }
    public set last_name(v : string) {
        this._model.last_name = v;
    }
    
    public get mobile() : string {
        return this._model.mobile;
    }
    public set mobile(v : string) {
        this._model.mobile = v;
    }
    
    public get email() : string {
        return this._model.email;
    }
    public set email(v : string) {
        this._model.email = v;
    }
    
    public get social_links() : Data.SocialLinks {
        return this._model.social_links;
    }
    public set social_links(v : Data.SocialLinks) {
        this._model.social_links = v;
    }
    
    
    public get picture() : string {
        return this._model.picture;
    }
    public set picture(v : string) {
        this._model.picture = v;
    }
    
    public get bio() : string {
        return this._model.bio;
    }
    public set bio(v : string) {
        this._model.bio = v;
    }
    
    
    public get stats() : string {
        return this._model.stats;
    }
    public set stats(v : string) {
        this._model.stats = v;
    }
    
}
      
