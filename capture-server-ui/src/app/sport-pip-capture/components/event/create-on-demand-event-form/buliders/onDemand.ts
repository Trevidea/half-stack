import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventFormView } from "../views/onDemand";



export class OnDemandFormBuilder extends AbstractBuilder<Data.Event, OnDemandEventFormView>{
    compose(m: Data.Event, v: OnDemandEventFormView) {

        v.id = m.id;
        v.title = m.title;
        v.detail.cityAddress = m.detail[0].streetAdress;
        v.detail.streetAdress = m.detail[0].cityAddress;
        v.dtEvent = m.dt_event;
        v.levels.SelectedItem = m.level;
        v.dayHalve.SelectedItem = m.dayHalve;
        v.programs.SelectedItem = m.program;
        v.sports.SelectedItem = m.sport;
        v.time = m.tm_event;
        v.venue.location = m.venue[0].location
        // Transformer.ComposeCollection(m.venue, v.venue, VenueBuilder)

    }
    decompose(v: OnDemandEventFormView): Data.Event {
        return; {
            // title: v.title,
            // detail: v.detail,
            // dt_event: v.dttEvent,
            // level: v.levels.SelectedItem,
            // dayHalve: v.dayHalve.SelectedItem,
            // program: v.programs.SelectedItem,
            // sport: v.sports.SelectedItem,
            // tm_event: v.time,
            // venue: v.venue,
            // status:"upcoming-events",
            // owner_id:v.owner_id
        };

    }
    view(): OnDemandEventFormView {
        return new OnDemandEventFormView();
    }

}



export class VenueBuilder extends AbstractBuilder<Data.Event, OnDemandEventFormView>{
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