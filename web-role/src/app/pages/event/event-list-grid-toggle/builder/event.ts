import { AbstractBuilder } from "src/app/blocks/strategies";
import { EventView } from "../views/events";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class EventBuilder extends AbstractBuilder<Data.Event, EventView> {
    override compose(m: Data.Event, v: EventView) {
        v.id = m.id;
        v.title = m.title
        v.dtEvent = m.dt_event;
        v.level = m.level;
        v.program = m.program;
        v.sport = m.sport;
        v.status = m.status;
        v.title = m.title;
        v.venue.cityAddress = m?.venue?.city_address;
        v.venue.streetAddress = m?.venue?.street_address;
        v.venue.location = m?.venue?.location;
        v.year = m.year;
        v.venue.location = m?.venue?.location;
        v.time = m.tm_event;
        v.type = m.type;
    }
    override decompose(v: EventView): Data.Event {
        throw new Error("Method not implemented.");
    }
    override view(): EventView {
        return new EventView();
    }
}