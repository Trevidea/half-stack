import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventFormView } from "../views/onDemand";
import moment from "moment";

export class EventBuilder extends AbstractBuilder<
  Data.Event,
  OnDemandEventFormView
> {
  compose(m: Data.Event, v: OnDemandEventFormView) {
    v.id = m.id;
    v.title = m.title;
    v.detail.cityAddress = m?.detail?.cityAddress;
    v.detail.streetAdress = m?.detail?.streetAddress;
    v.detail.type = m?.detail?.type;
    v.dtEvent = m.dt_event;
    v.levels.SelectedItem = m.level;
    v.programs.SelectedItem = m.program;
    v.sports.SelectedItem = m.sport;
    v.time = this.formatTimeNumToStr(m.tm_event);
    v.venue.location = m?.venue?.location;
  }

  formatTimeNumToStr(time: number): string {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    return formattedHours + ':' + formattedMinutes;
  }

  decompose(v: OnDemandEventFormView): Data.Event {
    const time = this.formatTime(v.time)
    return {
      id: v.id,
      title: v.title,
      detail: {
        cityAddress: v.detail.cityAddress,
        streetAddress: v.detail.streetAdress,
        type: v.detail.type
      },
      dt_event: v.dtEvent,
      level: v.levels.SelectedItem,
      program: v.programs.SelectedItem,
      sport: v.sports.SelectedItem,
      year: 2024,
      tm_event: time,
      venue: {
        location: v.venue.location,
      },
      status: "upcoming",
      type: "on-demand",
    };
  }
  formatTime(time: any): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':');
    let formattedTime = hours + minutes;
    return parseInt(formattedTime);
  }

  view(): OnDemandEventFormView {
    return new OnDemandEventFormView();
  }
}

export class VenueBuilder extends AbstractBuilder<
  Data.Event,
  OnDemandEventFormView
> {
  compose(m: Data.Event, v: OnDemandEventFormView) {
    v.venue[0].location = m.venue[0].location;
  }
  decompose(v: OnDemandEventFormView): Data.Event {
    return;

  }
  view(): OnDemandEventFormView {
    return new OnDemandEventFormView();
  }
}
