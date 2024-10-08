import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { EventView, } from "../views/event";
import moment from "moment";

export class EventRangeBuilder extends AbstractBuilder<Data.Event, EventView> {
    compose(m: Data.Event, v: EventView) {

        v.id = m.id;
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


    decompose(v: EventView): Data.Event {
        throw new Error("Method not implemented.");
    }
    view(): EventView {
        return new EventView()
    }

    /**update its value beased  on event time(m.tm_event) and  date(m.dt_event) if event time is greater then 
         current time then put status= upcoming else if  we add 2hours more in event time , then after adding two hour if event time event date and time is less then from that modified time then
         put status=ongoing  elase if current time is greater then after after ADDING TWO IN TIME THE PUT IT   status= past */

    getEventStatus(eventDateTime: moment.Moment, eventId: any) {
        const currentTime = moment();
        const oneMinuteLater = moment(eventDateTime).add(1, 'minutes');
        if (eventDateTime.isAfter(currentTime)) {
            return 'upcoming';
        } else if (oneMinuteLater.isAfter(currentTime) && eventDateTime.isBefore(oneMinuteLater)) {
            return 'on-going';
        } else {
            return 'past';
        }
    }


    formatTime(time: number): string {
        const hours: number = Math.floor(time / 100);
        const minutes: number = time % 100;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }


}

