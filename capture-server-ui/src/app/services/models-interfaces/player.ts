import { Data } from "./full-stack-interface";
import { DataBase } from "./model";

export class PlayerData extends DataBase<Data.Player>{

    
  
    public get id() : number {
        return this._model.id;
    }
    public set id(v : number) {
        this._model.id = v;
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
    
    
    public get hometown() : string {
        return this._model.hometown;
    }
    public set hometown(v : string) {
        this._model.hometown = v;
    }
    
    public get height() : number {
        return this._model.height;
    }
    public set height(v : number) {
        this._model.height = v;
    }
    
    
    public get weight() : number {
        return this._model.weight;
    }
    public set weight(v : number) {
        this._model.weight = v;
    }
    
    public get high_school() : string {
        return this._model.high_school;
    }
    public set high_school(v : string) {
        this._model.high_school = v;
    }
    
    public get prev_school() : string {
        return this._model.prev_school;
    }
    public set prev_school(v : string) {
        this._model.prev_school = v;
    }
    
    
    public get majors() : string {
        return this._model.majors;
    }
    public set majors(v : string) {
        this._model.majors = v;
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
    
    public get city() : string {
        return this._model.city;
    }
    public set city(v : string) {
        this._model.city = v;
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
    
    
    public get media() : Data.Media {
        return this._model.media;
    }
    public set media(v : Data.Media) {
        this._model.media = v;
    }
    

}