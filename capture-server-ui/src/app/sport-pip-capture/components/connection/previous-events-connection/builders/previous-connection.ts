import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { PreviousConnectionView } from "../views/previous-connection";


export class PreviousConnectionBuilder extends AbstractBuilder<Data.PreviousEventsConnection, PreviousConnectionView> {
    compose(m: Data.PreviousEventsConnection, v: PreviousConnectionView) {
        v.eventName = m.eventName;
        v.date = m.date;
        v.duration = m.duration;
        v.totalonnections = m.total_connections;
        v.mostonnectedDevice = m.most_connected_device;
    }
    
    decompose(v: PreviousConnectionView): Data.PreviousEventsConnection {
        return;
    }

    view(): PreviousConnectionView {
        return new PreviousConnectionView()
    }

}
