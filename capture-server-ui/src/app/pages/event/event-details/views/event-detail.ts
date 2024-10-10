
import { Collection, Range } from "src/app/blocks/collection"
import { SelectItemView } from "src/app/blocks/collection-item";
import { Views } from "src/app/services/models-interfaces/half-stack-interface";
export class EventsDetailRangeView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _gridView: boolean = true;
    public get gridView(): boolean {
        return this._gridView;
    }
    public set gridView(v: boolean) {
        this._gridView = v;
    }

    private _eventViewCollection: Collection<EventDetailView>;
    public get eventViewCollection(): Collection<EventDetailView> {
        if (!this._eventViewCollection) {
            this._eventViewCollection = new Collection<EventDetailView>();
        }
        return this._eventViewCollection;
    }
    public set eventViewCollection(v: Collection<EventDetailView>) {
        this._eventViewCollection = v;
    }


}

export class EventDetailView implements Views.Datasource {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _ownlogo: string;
    public get ownlogo(): string {
        return this._ownlogo;
    }
    public set ownlogo(v: string) {
        this._ownlogo = v;
    }

    private _opponentLogo: string;
    public get opponentLogo(): string {
        return this._opponentLogo;
    }
    public set opponentLogo(v: string) {
        this._opponentLogo = v;
    }

    private _countdown: string;
    public get countdown(): string {
        return this._countdown;
    }
    public set countdown(v: string) {
        this._countdown = v;
    }

    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(v: string) {
        this._title = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

    private _dtEvent: string;
    public get dtEvent(): string {
        return this._dtEvent;
    }
    public set dtEvent(v: string) {
        this._dtEvent = v;
    }

    private _time: number;
    public get time(): number {
        return this._time;
    }
    public set time(v: number) {
        this._time = v;
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

    private _status: string;
    public get status(): string {
        return this._status;
    }
    public set status(v: string) {
        this._status = v;
    }

    private _headCoachId: number;
    public get headCoachId(): number {
        return this._headCoachId;
    }
    public set headCoachId(v: number) {
        this._headCoachId = v;
    }

    private _assCoachId: number;
    public get assCoachId(): number {
        return this._assCoachId;
    }
    public set assCoachId(v: number) {
        this._assCoachId = v;
    }


    private _headCoachName: Collection<SelectItemView>;
    public get headCoachName(): Collection<SelectItemView> {
        if (!this._headCoachName) {
            this._headCoachName = new Collection<SelectItemView>();
        }
        return this._headCoachName;
    }
    public set headCoachName(v: Collection<SelectItemView>) {
        this._headCoachName = v;
    }

    private _assistantCoachName: Collection<SelectItemView>;
    public get assistantCoachName(): Collection<SelectItemView> {
        if (!this._assistantCoachName) {
            this._assistantCoachName = new Collection<SelectItemView>();
        }
        return this._assistantCoachName;
    }

    private _detail: EventDetail;
    public get detail(): EventDetail {
        if (!this._detail) {
            this._detail = new EventDetail();
        }
        return this._detail;
    }
    public set detail(v: EventDetail) {
        this._detail = v;
    }

}

export class VenueView {
    private _streetAddress: string;
    public get streetAddress(): string {
        return this._streetAddress;
    }
    public set streetAddress(v: string) {
        this._streetAddress = v;
    }

    private _cityAddress: string;
    public get cityAddress(): string {
        return this._cityAddress;
    }
    public set cityAddress(v: string) {
        this._cityAddress = v;
    }


    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }

    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }

}
export class EventDetail {
    // logo: string;

}

