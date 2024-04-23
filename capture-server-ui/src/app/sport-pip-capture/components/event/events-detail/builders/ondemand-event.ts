import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventView } from "../views/ondemand-event";

export class OnDemandBuilder extends AbstractBuilder<Data.Event, OnDemandEventView> {
    compose(m: Data.Event, v: OnDemandEventView) {
        v.title = m.title
    }
    decompose(v: OnDemandEventView): Data.Event {
        throw new Error("Method not implemented.");
    }
    view(): OnDemandEventView {
        return new OnDemandEventView();
    }

}
