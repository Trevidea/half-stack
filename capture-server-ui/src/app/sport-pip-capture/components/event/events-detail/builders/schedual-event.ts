import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { SchedualEventView } from "../views/schedual-event";

export class SchedualEventBuilder extends AbstractBuilder<Data.ScheduledEvent, SchedualEventView>{
    compose(m: Data.ScheduledEvent, v: SchedualEventView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: SchedualEventView): Data.ScheduledEvent {
        throw new Error("Method not implemented.");
    }
    view(): SchedualEventView {
        throw new Error("Method not implemented.");
    }

}