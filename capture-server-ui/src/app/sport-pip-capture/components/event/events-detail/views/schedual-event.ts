import { Collection } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class SchedualEventView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _countdown: string;
    public get countdown(): string {
        return this._countdown;
    }
    public set countdown(v: string) {
        this._countdown = v;
    }

    private _time: number;
    public get time(): number {
        return this._time;
    }
    public set time(v: number) {
        this._time = v;
    }


    private _sport: string;
    public get sport(): string {
        return this._sport;
    }
    public set sport(v: string) {
        this._sport = v;
    }


    private _level: string;
    public get level(): string {

        return this._level;
    }
    public set level(v: string) {
        this._level = v;
    }


    private _program: string;
    public get program(): string {
        return this._program;
    }
    public set program(v: string) {
        this._program = v;
    }


    private _year: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }

    private _dtEvent: Date;
    public get dtEvent(): Date {
        return this._dtEvent;
    }
    public set dtEvent(v: Date) {
        this._dtEvent = v;
    }



    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(v: string) {
        this._status = v;
    }
    private _detail: EventDetailView;
    public get detail(): EventDetailView {
        if (!this._detail) {
            this._detail = new EventDetailView();
        }
        return this._detail;
    }
    public set detail(v: EventDetailView) {
        this._detail = v;
    }
    private _venue: VenueView;
    public get venue(): VenueView {
        if (!this._venue) {
            this._venue = new VenueView();
        }
        return this._venue;
    }
    public set venue(v: VenueView) {
        this._venue = v;
    }


    private _formatedDateTime: string;
    public get formatedDateTime(): string {
        return this._formatedDateTime;
    }
    public set formatedDateTime(v: string) {
        this._formatedDateTime = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }


    private _contactsDetails: Collection<ContactsDetails>;
    public get contactsDetails(): Collection<ContactsDetails> {
        return this._contactsDetails;
    }
    public set contactsDetails(v: Collection<ContactsDetails>) {
        this._contactsDetails = v;
    }


}

export class VenueView {
    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }
}
export class EventDetailView {
    private _streetAdress: string;
    public get streetAdress(): string {
        return this._streetAdress;
    }
    public set streetAdress(v: string) {
        this._streetAdress = v;
    }

    private _cityAddress: string;
    public get cityAddress(): string {
        return this._cityAddress;
    }
    public set cityAddress(v: string) {
        this._cityAddress = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

}

export class ContactsDetails {

    private _contactName: string;
    public get contactName(): string {
        return this._contactName;
    }
    public set contactName(v: string) {
        this._contactName = v;
    }

    private _contactEmail: string;
    public get contactEmail(): string {
        return this._contactEmail;
    }
    public set contactEmail(v: string) {
        this._contactEmail = v;
    }

    private _contactPhone: string;
    public get contactPhone(): string {
        return this._contactPhone;
    }
    public set contactPhone(v: string) {
        this._contactPhone = v;
    }

}
export class TeamInfo {

    private _sport: string;
    public get sport(): string {
        return this._sport;
    }
    public set sport(v: string) {
        this._sport = v;
    }

    private _program: string;
    public get program(): string {
        return this._program;
    }
    public set program(v: string) {
        this._program = v;
    }

    private _level: string;
    public get level(): string {
        return this._level;
    }
    public set level(v: string) {
        this._level = v;
    }

    private _oppositionlogo: string;
    public get oppositionlogo(): string {
        return this._oppositionlogo;
    }
    public set oppositionlogo(v: string) {
        this._oppositionlogo = v;
    }

    private _OppositionTeam: string;
    public get OppositionTeam(): string {
        return this._OppositionTeam;
    }
    public set OppositionTeam(v: string) {
        this._OppositionTeam = v;
    }

}


export class Roster {

    private _rosterType: string;
    public get rosterType(): string {
        return this._rosterType;
    }
    public set rosterType(v: string) {
        this._rosterType = v;
    }

    jersey
}

export class RosterDetail {

    private _playerName: string;
    public get playerName(): string {
        return this._playerName;
    }
    public set playerName(v: string) {
        this._playerName = v;
    }

    private _playerPosition: string;
    public get playerPosition(): string {
        return this._playerPosition;
    }
    public set playerPosition(v: string) {
        this._playerPosition = v;
    }
    
    private _JerseyNumber : string;
    public get JerseyNumber() : string {
        return this._JerseyNumber;
    }
    public set JerseyNumber(v : string) {
        this._JerseyNumber = v;
    }
    
}