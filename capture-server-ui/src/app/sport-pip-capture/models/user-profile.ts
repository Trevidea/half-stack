import { DataBase } from "./model";
import { Data } from "./capture-interface";


export class UserProfileData extends DataBase<Data.UserProfile>{
    
    public get firstname() : string {
        return this._model.firstname;
    }
    public set firstname(v : string) {
        this._model.firstname = v;
    }
   
    public get lastname() : string {
        return this._model.lastname;
    }
    public set lastname(v : string) {
        this._model.lastname = v;
    }

    
    public get email() : string {
        return this._model.email;
    }
    public set email(v : string) {
        this._model.email = v;
    }
    
    
    private _phone : string;
    public get phone() : string {
        return this._model.phone;
    }
    public set phone(v : string) {
        this._model.phone = v;
    }
    
    
   
    public get role() : string {
        return this._model.role;
    }
    public set role(v : string) {
        this._model.role = v;
    }
    
    public get address() : string {
        return this._model.address;
    }
    public set address(v : string) {
        this._model.address = v;
    }
    
    
}