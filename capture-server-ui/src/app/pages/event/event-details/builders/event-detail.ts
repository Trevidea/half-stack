import { AbstractBuilder } from "src/app/blocks/strategies";
import { EventDetailView } from "../views/event-detail";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class EventDetailsBuilder extends AbstractBuilder<Data.Event, EventDetailView> {
    override compose(m: Data.Event, v: EventDetailView) {
        console.log(m)
        v.id = m.id;
        v.title = m.title;
        v.type = m.type;
        v.program = m.program;
        v.level = m.level;
        v.dtEvent = m.dt_event;
        v.time = m.tm_event;
        v.sport = m.sport;
        v.status = m.status;
        v.venue.cityAddress = m?.venue?.city_address;
        v.venue.streetAddress = m?.venue?.street_address;
        v.venue.location = m?.venue?.location;

    }
    timeNumToStr(time: number): string {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const formattedHours = hours < 10 ? '0' + hours : hours.toString();
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
        return formattedHours + ':' + formattedMinutes;
    }

    override decompose(v: EventDetailView): Data.Event {
        throw new Error("Method not implemented.");
    }
    override view(): EventDetailView {
        return new EventDetailView();
    }

}