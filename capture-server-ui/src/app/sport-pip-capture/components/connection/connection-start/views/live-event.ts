import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Collection, Range } from "app/blocks/collection";
export class LiveRangeView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    private _liveView: Range<liveEventDetail>;
    public get liveView(): Range<liveEventDetail> {
        return this._liveView;
    }
    public set liveView(v: Range<liveEventDetail>) {
        this._liveView = v;
    }

}

export class liveEventDetail implements Views.Datasource {
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

    private _ongoingCountdown: string;
    public get ongoingCountdown(): string {
        return this._ongoingCountdown;
    }
    public set ongoingCountdown(v: string) {
        this._ongoingCountdown = v;
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

    private _dtEvent: string;
    public get dtEvent(): string {
        return this._dtEvent;
    }
    public set dtEvent(v: string) {
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

    // private _connectionDetails: Collection<ConnectionDetailsView>;
    // public get connectionDetails(): Collection<ConnectionDetailsView> {
    //     if (!this._connectionDetails) {
    //         this._connectionDetails = new Collection<ConnectionDetailsView>();
    //     }
    //     return this._connectionDetails;
    // }

    private _connectionDetails: Range<ConnectionDetailsView>;
    public get connectionDetails(): Range<ConnectionDetailsView> {
        if (!this._connectionDetails) {
            this._connectionDetails = new Range<ConnectionDetailsView>()
        }
        return this._connectionDetails;
    }
    public set connectionDetails(v: Range<ConnectionDetailsView>) {
        this._connectionDetails = v;
    }
}


export class ConnectionDetailsView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

    private _location: string;
    public get location(): string {
        return this._location;
    }
    public set location(v: string) {
        this._location = v;
    }

    private _device: string;
    public get device(): string {
        return this._device;
    }
    public set device(v: string) {
        this._device = v;
    }

    private _deviceType: string;
    public get deviceType(): string {
        return this._deviceType;
    }
    public set deviceType(v: string) {
        this._deviceType = v;
    }

    private _network: string;
    public get network(): string {
        return this._network;
    }
    public set network(v: string) {
        this._network = v;
    }

    private _quality: string;
    public get quality(): string {
        return this._quality;
    }
    public set quality(v: string) {
        this._quality = v;
    }

    private _ipAddress: string;
    public get ipAddress(): string {
        return this._ipAddress;
    }
    public set ipAddress(v: string) {
        this._ipAddress = v;
    }

    private _transmitStatus: any;
    public get transmitStatus(): any {
        return this._transmitStatus;
    }
    public set transmitStatus(v: any) {
        this._transmitStatus = v;
    }

    private _received: number;
    public get received(): number {
        return this._received;
    }
    public set received(v: number) {
        this._received = v;
    }

    private _retries: string;
    public get retries(): string {
        return this._retries;
    }
    public set retries(v: string) {
        this._retries = v;
    }

    private _role: string;
    public get role(): string {
        return this._role;
    }
    public set role(v: string) {
        this._role = v;
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
