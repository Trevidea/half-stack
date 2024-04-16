import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventFormView } from "../views/onDemand";
import moment from "moment";



export class EventBuilder extends AbstractBuilder<Data.Event, OnDemandEventFormView> {
    compose(m: Data.Event, v: OnDemandEventFormView) {
        v.id = m.id;
        v.title = m.title;
        v.detail.cityAddress = m?.detail?.cityAddress;
        v.detail.streetAdress = m?.detail?.streetAdress;
        v.detail.type = m?.detail?.type;
        v.dtEvent = m.dt_event;
        v.levels.SelectedItem = m.level;
        v.programs.SelectedItem = m.program;
        v.sports.SelectedItem = m.sport;
        v.time = m.tm_event;
        v.venue.location = m?.venue?.location;
        console.log("View data", v)
    }


    decompose(v: OnDemandEventFormView): Data.Event {
        console.log("View data", v)
        return {
            id: v.id,
            title: v.title,
            detail: {
                cityAddress: v.detail.cityAddress,
                streetAdress: v.detail.streetAdress,
                type: v.detail.type
            },
            dt_event: v.dtEvent,
            level: v.levels.SelectedItem,
            program: v.programs.SelectedItem,
            sport: v.sports.SelectedItem,
            year: 2024,
            tm_event: v.time,
            venue: {
                location: v.venue.location
            },
            status: "upcoming",
            type: 'on-demand',
        };

    }

    view(): OnDemandEventFormView {
        return new OnDemandEventFormView();
    }

}



export class VenueBuilder extends AbstractBuilder<Data.Event, OnDemandEventFormView> {
    compose(m: Data.Event, v: OnDemandEventFormView) {

        v.venue[0].location = m.venue[0].location
    }
    decompose(v: OnDemandEventFormView): Data.Event {
        return;
        // const ve = []
        // ve.push(v.venue[0].location)
        // return {
        //     id: v.id,
        //     // venue: ve as []
        // }
    }
    view(): OnDemandEventFormView {
        return new OnDemandEventFormView();
    }

}