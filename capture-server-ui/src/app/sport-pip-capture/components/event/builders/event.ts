import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { EventView,} from "../views/event";

export class EventRangeBuilder extends AbstractBuilder<Data.Event, EventView>{
    compose(m: Data.Event, v: EventView) {
        console.log("Model (m):", m.dt_event);
        v.id = m.id;
        v.dtEvent = m.dt_event;
        v.level = m.level;
        v.program = m.program;
        v.sport = m.sport;
        v.status = m.status;
        v.title = m.title;
        v.detail.cityAddress = m?.detail?.cityAddress;
        v.detail.streetAdress = m?.detail?.streetAdress;
        v.detail.type = m?.detail?.type;
        v.year = m.year;
        v.venue.location = m?.venue?.location;
        v.time = m.tm_event;
        v.type= m.type;
        console.log("View (v):", v);
    }
    decompose(v: EventView): Data.Event {
        throw new Error("Method not implemented.");
    }
    view(): EventView {
        return new EventView()
    }

}

