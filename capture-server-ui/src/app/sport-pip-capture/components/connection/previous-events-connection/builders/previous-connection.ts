import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { PreviousConnectionView } from "../views/previous-connection";


export class PreviousConnectionBuilder extends AbstractBuilder<Data.PreviousEventsConnection, PreviousConnectionView>{
    compose(m: Data.PreviousEventsConnection, v: PreviousConnectionView) {
        v.id = m.id
        v["Network Quality"] = m["Network Quality"]
        v.userId = m.userId;
        v["Connection Date"] = m["Connection Date"]
        v["IP Address"] = m["IP Address"]
        v.Time = m.Time

    }
    decompose(v: PreviousConnectionView): Data.PreviousEventsConnection {
        throw new Error("Method not implemented.");
    }
    view(): PreviousConnectionView {
        return new PreviousConnectionView()
    }

}
