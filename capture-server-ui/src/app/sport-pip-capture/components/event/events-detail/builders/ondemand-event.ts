import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { OnDemandEventView } from "../views/ondemand-event";

export class OnDemandBuilder extends AbstractBuilder<Data.OnDemandEvent, OnDemandEventView>{
    compose(m: Data.OnDemandEvent, v: OnDemandEventView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: OnDemandEventView): Data.OnDemandEvent {
        throw new Error("Method not implemented.");
    }
    view(): OnDemandEventView {
        throw new Error("Method not implemented.");
    }

}
