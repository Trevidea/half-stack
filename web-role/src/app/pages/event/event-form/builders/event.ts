
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
import { OnDemandEventFormView } from "../views/onDemand";
import { AbstractBuilder } from "src/app/blocks/strategies";

export class EventBuilder extends AbstractBuilder<
  Data.Event,
  OnDemandEventFormView
> {
  compose(m: Data.Event, v: OnDemandEventFormView) {
    console.log(m)
    // If formType is 'repeat', set dt_event and tm_event to current date and time
    if (v.formType === 'repeat') {
      const now = new Date();
      m.dt_event = this.formatDateToYYYYMMDD(now); // Convert to the format you need
      m.tm_event = this.formatTimeToHHMM(now);      // Convert to the time format you need
    }
    v.id = m.id;
    v.title = m.title;
    v.venue.cityAddress = m?.venue?.city_address;
    v.venue.streetAddress = m?.venue?.street_address;
    v.venue.location = m?.venue?.location;
    v.dtEvent = m.dt_event;
    v.levels.SelectedItem = m.level;
    v.programs.SelectedItem = m.program;
    v.sports.SelectedItem = m.sport;
    v.time = this.formatTimeNumToStr(m.tm_event);
  }


  private formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatTimeToHHMM(date: Date): number {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return parseInt(`${hours}${minutes}`);
  }

  formatTimeNumToStr(time: number): string {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    return formattedHours + ':' + formattedMinutes;
  }

  decompose(v: OnDemandEventFormView): Data.Event {

    if (v.formType === 'repeat') {
      v.id = null
      console.log("reaptev", v);
    }
    const time = this.formatTime(v.time)
    // Format the event date to 'YYYY-MM-DD' format
    // Format the event date to 'YYYY-MM-DD' in local time zone
    const eventDate = new Date(v.dtEvent).toLocaleDateString('en-CA');
    return {
      id: v.id,
      title: v.title,
      detail: {
      },
      dt_event: eventDate,
      level: v.levels.SelectedItem,
      program: v.programs.SelectedItem,
      sport: v.sports.SelectedItem,
      year: 2024,
      tm_event: time,
      venue: {
        location: v.venue.location,
        street_address: v.venue.streetAddress,
        city_address: v.venue.cityAddress,
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
    throw new Error("not implemented");

  }
  view(): OnDemandEventFormView {
    return new OnDemandEventFormView();
  }
}
