import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandView } from "../views/ondemand-event";

export class OnDemandBuilder extends AbstractBuilder<Data.Event, OnDemandView>{
    compose(m: Data.Event, v: OnDemandView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: OnDemandView): Data.Event {
        throw new Error("Method not implemented.");
    }
    view(): OnDemandView {
        throw new Error("Method not implemented.");
    }
}
