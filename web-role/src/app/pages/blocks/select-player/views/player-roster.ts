import { Collection } from "src/app/blocks/collection";
import { Views } from "src/app/services/models-interfaces/full-stack-interface";


export class PlayerRosterView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _playerRosterCollection: Collection<PlayerRoster>;
    public get playerRosterCollection(): Collection<PlayerRoster> {
        if (!this._playerRosterCollection) {
            this._playerRosterCollection = new Collection<PlayerRoster>();
        }
        return this._playerRosterCollection;
    }
    public set playerRosterCollection(v: Collection<PlayerRoster>) {
        this._playerRosterCollection = v;
    }

}

export class PlayerRoster implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
     
    
    private _picture : string;
    public get picture() : string {
        return this._picture;
    }
    public set picture(v : string) {
        this._picture = v;
    }
    

    private _playerFirstName: string;
    public get playerFirstName(): string {
        return this._playerFirstName;
    }
    public set playerFirstName(v: string) {
        this._playerFirstName = v;
    }

    private _playerLastName: string;
    public get playerLastName(): string {
        return this._playerLastName;
    }
    public set playerLastName(v: string) {
        this._playerLastName = v;
    }


    private _JerseyNumber: string;
    public get JerseyNumber(): string {
        return this._JerseyNumber;
    }
    public set JerseyNumber(v: string) {
        this._JerseyNumber = v;
    }


    private _isSelected: boolean;
    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(v: boolean) {
        this._isSelected = v;
    }
 
    
    private _position : string;
    public get position() : string {
        return this._position;
    }
    public set position(v : string) {
        this._position = v;
    }

}