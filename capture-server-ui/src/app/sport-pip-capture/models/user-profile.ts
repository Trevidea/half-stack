import { DataBase } from "./model";
import { Data } from "./capture-interface";


export class UserProfileData extends DataBase<Data.UserProfile>{
    
    public get firstName() : string {
        return this._model.firstName;
    }
    public set firstName(v : string) {
        this._model.firstName = v;
    }
   
    public get lastName() : string {
        return this._model.lastName;
    }
    public set lastName(v : string) {
        this._model.lastName = v;
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
    
    
   
    public get role() : Data.Role {
        return this._model.role;
    }
    public set role(v : Data.Role) {
        this._model.role = v;
    }
    
    public get address() : string {
        return this._model.address;
    }
    public set address(v : string) {
        this._model.address = v;
    }
    
    
}