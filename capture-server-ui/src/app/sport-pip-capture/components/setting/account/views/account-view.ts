import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Collection, Range } from "app/blocks/collection";

export class AccountViewRange implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _account: Range<AccountView>;
    public get account(): Range<AccountView> {
        if (!this._account) {
            this._account = new Range<AccountView>();
        }
        return this._account;
    }
    public set account(v: Range<AccountView>) {
        this._account = v;
    }
}

export class AccountView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _userName: string;
    public get userName(): string {
        return this._userName;
    }
    public set userName(v: string) {
        this._userName = v;
    }

    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(v: string) {
        this._firstName = v;
    }

    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(v: string) {
        this._lastName = v;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(v: string) {
        this._email = v;
    }

    private _phoneNumber: string;
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(v: string) {
        this._phoneNumber = v;
    }

    private _dateOfBirth: string;
    public get dateOfBirth(): string {
        return this._dateOfBirth;
    }
    public set dateOfBirth(v: string) {
        this._dateOfBirth = v;
    }

    private _role: string;
    public get role(): string {
        return this._role;
    }
    public set role(v: string) {
        this._role = v;
    }

    private _gender: string;
    public get gender(): string {
        return this._gender;
    }
    public set gender(v: string) {
        this._gender = v;
    }

    private _address: string;
    public get address(): string {
        return this._address;
    }
    public set address(v: string) {
        this._address = v;
    }


}