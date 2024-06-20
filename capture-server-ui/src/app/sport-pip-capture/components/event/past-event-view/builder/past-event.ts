import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import moment from "moment";
import { PasEventView } from "../view/past-event-view";

export class PastEventBuilder extends AbstractBuilder<
  Data.Event,
  PasEventView
> {
  compose(m: Data.Event, v: PasEventView) {
    console.log(m)
    v.id = m.id;
    v.type = m.type;
    v.title = m.title;
    v.detail.cityAddress = m?.detail?.cityAddress;
    v.detail.streetAdress = m?.detail?.streetAddress;
    v.detail.type = m?.detail?.type;
    v.dtEvent = m.dt_event;
    v.level = m.level;
    v.program = m.program;
    v.sport = m.sport;
    v.time = m.tm_event;
    v.year = m.year
    v.venue.location = m?.venue?.location;
  }

  formatTimeNumToStr(time: number): string {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    return formattedHours + ':' + formattedMinutes;
  }

  decompose(v: PasEventView): Data.Event {
    return;
  }
  formatTime(time: any): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':');
    let formattedTime = hours + minutes;
    return parseInt(formattedTime);
  }

  view(): PasEventView {
    return new PasEventView();
  }
}

export class VenueBuilder extends AbstractBuilder<
  Data.Event,
  PasEventView
> {
  compose(m: Data.Event, v: PasEventView) {
    v.venue[0].location = m.venue[0].location;
  }
  decompose(v: PasEventView): Data.Event {
    return;

  }
  view(): PasEventView {
    return new PasEventView();
  }
}
