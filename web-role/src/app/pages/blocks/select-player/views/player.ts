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

    private _playerList: Collection<PlayerView>;
    public get playerList(): Collection<PlayerView> {
        if (!this._playerList) {
            this._playerList = new Collection<PlayerView>();
        }
        return this._playerList;
    }
    public set playerList(v: Collection<PlayerView>) {
        this._playerList = v;
    }

}


export class PlayerView {
    private _playerId: number;
    public get playerId(): number {
        return this._playerId;
    }
    public set playerId(v: number) {
        this._playerId = v;
    }

    private _picture: string;
    public get picture(): string {
        return this._picture;
    }
    public set picture(v: string) {
        this._picture = v;
    }

    private _playerName: string;
    public get playerName(): string {
        return this._playerName;
    }
    public set playerName(v: string) {
        this._playerName = v;
    }

    private _JerseyNumber: string;
    public get JerseyNumber(): string {
        return this._JerseyNumber;
    }
    public set JerseyNumber(v: string) {
        this._JerseyNumber = v;
    }

    private _position: string;
    public get position(): string {
        return this._position;
    }
    public set position(v: string) {
        this._position = v;
    }

    private _isSelected: boolean;
    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(v: boolean) {
        this._isSelected = v;
    }
}