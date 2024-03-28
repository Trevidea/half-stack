import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { OnDemandEventFormView } from "../views/onDemand";



export class OnDemandFormBuilder extends AbstractBuilder<Data.Event, OnDemandEventFormView>{
    compose(m: Data.Event, v: OnDemandEventFormView) {
      
        v.id = m.id;
        v.title = m.title;
        v.detail.cityAddress = m.detail[0].streetAdress;
        v.detail.streetAdress = m.detail[0].cityAddress;
        v.dttEvent = m.dtevent;
        v.levels.SelectedItem = m.level;
        v.dayHalve.SelectedItem = m.dayHalve;
        v.onPromise = false;
        v.programs.SelectedItem = m.program;
        v.sports.SelectedItem = m.sport;
        v.time = m.time;
        v.venue.location = m.venue[0].location
        // Transformer.ComposeCollection(m.venue, v.venue, VenueBuilder)

    }
    decompose(v: OnDemandEventFormView): Data.Event {
      
        const newDetal = []
        const newVenu = []
        newDetal.push({
            "cityAddress": v.detail.cityAddress, 
            "streetAdress": v.detail.streetAdress,
            "type":"On Demand Event"
        })
        newVenu.push({
            "location": v.venue.location,
        })
        return {
            id: v.id,
            title: v.title,
            // detail: newDetal,
            dtevent: v.dttEvent,
            level: v.levels.SelectedItem,
            dayHalve: v.dayHalve.SelectedItem,
            onPremise: false,
            program: v.programs.SelectedItem,
            sport: v.sports.SelectedItem,
            time: v.time,
            // venue: newVenu,
            status:"upcoming-events",
            
        }

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
        const ve = []
        ve.push(v.venue[0].location)
        return {
            id: v.id,
            // venue: ve as []
        }
    }
    view(): OnDemandEventFormView {
        return new OnDemandEventFormView();
    }

}