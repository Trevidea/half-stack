import { Collection, Range } from "app/blocks/collection";
import { Views } from "app/sport-pip-capture/models/capture-interface";


export class EventRange implements Views.Datasource {

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }
    private _years: Collection<string>;
    public get years(): Collection<string> {
        if (!this._years) {
            this._years = new Collection<string>();
        }
        return this._years;
    }
    public set years(v: Collection<string>) {
        this._years = v;
    }

    private _sports: Collection<string>;
    public get sports(): Collection<string> {
        if (!this._sports) {
            this._sports = new Collection<string>();
        }
        return this._sports;
    }
    public set sports(v: Collection<string>) {
        this._sports = v;
    }
    private _programs: Collection<string>;
    public get programs(): Collection<string> {
        if (!this._programs) {
            this._programs = new Collection<string>();
        }
        return this._programs;
    }
    public set programs(v: Collection<string>) {
        this._programs = v;
    }



    private _levels: Collection<string>;
    public get levels(): Collection<string> {
        if (!this._levels) {
            this._levels = new Collection<string>();
        }
        return this._levels;
    }
    public set levels(v: Collection<string>) {
        this._levels = v;
    }

    private _pastEvent: Range<PastEventView>;
    public get pastEvent(): Range<PastEventView> {
        if (!this._pastEvent) {
            this._pastEvent = new Range<PastEventView>()
        }
        return this._pastEvent;
    }
    public set pastEvent(v: Range<PastEventView>) {
        this._pastEvent = v;
    }

    private _upcomingEvent: Range<UpcomingEventView>;
    public get upcomingEvent(): Range<UpcomingEventView> {
        if (!this._upcomingEvent) {
            this._upcomingEvent = new Range<UpcomingEventView>();
        }
        return this._upcomingEvent;
    }
    public set upcomingEvent(v: Range<UpcomingEventView>) {
        this._upcomingEvent = v;
    }

    private _ongoingEvent: Range<OngoingEventView>;
    public get ongoingEvent(): Range<OngoingEventView> {
        if (!this._ongoingEvent) {
            this._ongoingEvent = new Range<OngoingEventView>()
        }
        return this._ongoingEvent;
    }
    public set ongoingEvent(v: Range<OngoingEventView>) {
        this._ongoingEvent = v;
    }

}
export class OngoingEventView implements Views.Datasource {
    private _id: number;
    v: {};
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
}
export class UpcomingEventView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        console.log(this._id)
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }


    private _time: string;
    public get time(): string {
        return this._time;
    }
    public set time(v: string) {
        this._time = v;
    }

    private _sport: string;
    public get sport(): string {
        return this._sport;
    }
    public set sport(v: string) {
        this._sport = v;
    }


    private _level: String;
    public get level(): String {

        return this._level;
    }
    public set level(v: String) {
        this._level = v;
    }




    private _program: Collection<String>;
    public get program(): Collection<String> {
        if (!this._program) {
            this._program = new Collection<string>();
        }
        return this._program;
    }
    public set program(v: Collection<String>) {
        this._program = v;
    }


    private _year: number;
    public get year(): number {
        console.log(this._year)
        if (!this._year) {

            this._year = new Date().getFullYear();

            console.log(this._year)
        }
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }

    private _dttEvent: string;
    public get dttEvent(): string {
        return this._dttEvent;
    }
    public set dttEvent(v: string) {
        this._dttEvent = v;
    }



    private _onPremise: boolean;
    public get onPremise(): boolean {
        return this._onPremise;
    }
    public set onPremise(v: boolean) {
        this._onPremise = v;
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

}
export class PastEventView implements Views.Datasource {

    private _id: number;
    public get id(): number {
        console.log(this._id)
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _time: string;
    public get time(): string {
        return this._time;
    }
    public set time(v: string) {
        this._time = v;
    }


    private _sport: string;
    public get sport(): string {
        return this._sport;
    }
    public set sport(v: string) {
        this._sport = v;
    }


    private _level: String;
    public get level(): String {

        return this._level;
    }
    public set level(v: String) {
        this._level = v;
    }


    private _program: Collection<String>;
    public get program(): Collection<String> {
        if (!this._program) {
            this._program = new Collection<string>();
        }
        return this._program;
    }
    public set program(v: Collection<String>) {
        this._program = v;
    }


    private _year: number;
    public get year(): number {
        return this._year;
    }
    public set year(v: number) {
        this._year = v;
    }

    private _dttEvent: string;
    public get dttEvent(): string {
        return this._dttEvent;
    }
    public set dttEvent(v: string) {
        this._dttEvent = v;
    }



    private _onPremise: boolean;
    public get onPremise(): boolean {
        return this._onPremise;
    }
    public set onPremise(v: boolean) {
        this._onPremise = v;
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
