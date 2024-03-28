import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { EventRange, OngoingEventView, PastEventView, UpcomingEventView } from "../views/event";
import { Transformer } from "app/blocks/transformer";


export class EventRangeBuilder extends AbstractBuilder<Data.Event, OngoingEventView>{
    compose(m: Data.Event, v: OngoingEventView) {
        console.log("Model (m):", m.dtevent);
        v.id = m.id;
        v.dttEvent = m.dtevent;
        v.level = m.level;
        v.onPremise = m.onPremise;
        v.program.SelectedItem = m.program;
        v.sport = m.sport;
        v.status = m.status;
        v.title = m.title;
        v.detail.cityAddress = m.detail.cityAddress;
        v.detail.streetAdress = m.detail.streetAdress;
        v.detail.type = m.detail.type;
        v.year = m.year;
        v.venue.location = m.venue.location;
        v.time = m.time;

        console.log("View (v):", v);
    }
    decompose(v: OngoingEventView): Data.Event {
        throw new Error("Method not implemented.");
    }
    view(): OngoingEventView {
        return new OngoingEventView()
    }

}


export class UpcomingEventBuilder extends AbstractBuilder<Data.Event, UpcomingEventView>{
    compose(m: Data.Event, v: UpcomingEventView) {
        console.log(v.year)
        v.id = m.id;
        v.dttEvent = m.dtevent;
        v.level = m.level;
        v.onPremise = m.onPremise;
        v.program.SelectedItem = m.program;
        v.sport = m.sport;
        v.status = m.status;
        v.title = m.title;
        v.detail.cityAddress = m.detail[0].streetAdress;
        v.detail.streetAdress = m.detail[0].cityAddress;
        v.detail.type = m.detail[0].type;
        v.year = m.year;
        v.venue.location = m.venue[0].location
        v.time = m.time

    }
    decompose(v: UpcomingEventView): Data.Event {
        return
    }
    view(): UpcomingEventView {
        return new UpcomingEventView()
    }
}
// UpcomingEventBuilder
export class PastEventBuilder extends AbstractBuilder<Data.Event, PastEventView>{
    compose(m: Data.Event, v: PastEventView) {

        v.id = m.id;
        v.dttEvent = m.dtevent;
        v.level = m.level;
        v.onPremise = m.onPremise;
        v.program.SelectedItem = m.program;
        v.sport = m.sport;
        v.status = m.status;
        v.title = m.title;
        v.detail.cityAddress = m.detail[0].streetAdress;
        v.detail.streetAdress = m.detail[0].cityAddress;
        v.venue.location = m.venue[0].location;
        v.detail.type = m.detail[0].type;
        v.year = m.year;
        v.time = m.time
    }
    decompose(v: PastEventView): Data.Event {
        return
    }
    view(): PastEventView {
        return new PastEventView()
    }
}