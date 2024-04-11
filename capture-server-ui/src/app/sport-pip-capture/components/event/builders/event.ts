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
        v.status = this.getEventStatus(moment(`${m.dt_event} ${this.formatTime(m.tm_event)}`, "YYYY-MM-DD HH:mm"), m.id); // This line assigns the status
        v.title = m.title;
        v.detail.cityAddress = m?.detail?.cityAddress;
        v.detail.streetAdress = m?.detail?.streetAdress;
        v.detail.type = m?.detail?.type;
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
        const twoHoursLater = moment(eventDateTime).add(2, 'hours');
        if (eventDateTime.isAfter(currentTime)) {
            return 'upcoming';
        } else if (twoHoursLater.isAfter(currentTime) && eventDateTime.isBefore(twoHoursLater)) {
            return 'ongoing';
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

