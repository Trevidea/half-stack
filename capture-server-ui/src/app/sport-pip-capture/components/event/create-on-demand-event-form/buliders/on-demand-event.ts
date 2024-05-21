import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventFormView } from "../views/onDemand";
import { AbstractBuilder } from "app/blocks/strategies";


export class OnDemandEventBuilder extends AbstractBuilder<Data.OnDemandEvent, OnDemandEventFormView> {
    compose(m: Data.OnDemandEvent, v: OnDemandEventFormView) {
          
    }
    decompose(v: OnDemandEventFormView): Data.OnDemandEvent {
        return {
            id: v.id,
            event_id: v.eventId,
            owner_id: 1
        }
    }
    view(): OnDemandEventFormView {
        return new OnDemandEventFormView();
    }

}