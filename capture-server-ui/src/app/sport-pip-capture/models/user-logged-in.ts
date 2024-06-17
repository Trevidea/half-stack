import { Data } from "./capture-interface";
import { DataBase } from "./model";

export class LoggedInUserData extends DataBase<Data.LoggedInUser> {

    public get username(): string {
        return this._model.username;
    }
    public set username(v: string) {
        this._model.username = v;
    }

    public get firstName(): string {
        return this._model.firstName;
    }
    public set firstName(v: string) {
        this._model.firstName = v;
    }

    public get lastName(): string {
        return this._model.lastName;
    }
    public set lastName(v: string) {
        this._model.lastName = v;
    }

    public get email(): string {
        return this._model.email;
    }
    public set email(v: string) {
        this._model.email = v;
    }

    public get phoneNumber(): string {
        return this._model.phoneNumber;
    }
    public set phoneNumber(v: string) {
        this._model.phoneNumber = v;
    }

    public get address(): string {
        return this._model.address;
    }
    public set address(v: string) {
        this._model.address = v;
    }

    public get role(): string {
        return this._model.role;
    }
    public set role(v: string) {
        this._model.role = v;
    }

}
