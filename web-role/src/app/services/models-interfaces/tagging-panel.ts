import { Data } from "./half-stack-interface";
import { DataBase } from "./model";

export class TagPanelData extends DataBase<Data.TaggingPanel>{
    
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
     
     public get logo() : string {
         return this._model.logo;
     }
     public set logo(v : string) {
         this._model.logo = v;
     }
     
     public get ver_major() : number {
         return this._model.ver_major;
     }
     public set ver_major(v : number) {
         this._model.ver_major = v;
     }
 
     public get ver_minor() : number {
         return this._model.ver_minor;
     }
     public set ver_minor(v : number) {
         this._model.ver_minor = v;
     }
   
     public get ver_patch() : number {
         return this._model.ver_patch;
     }
     public set ver_patch(v : number) {
         this._model.ver_patch = v;
     }
     
     public get tags() : string {
         return this._model.tags;
     }
     public set tags(v : string) {
         this._model.tags = v;
     }
     
 }