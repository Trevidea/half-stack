import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
import { PreviousConnectionView } from "../view/previous-connection";

export class PreviousConnectionBuilder extends AbstractBuilder<Data.PreviousEventsConnection, PreviousConnectionView> {
    compose(m: Data.PreviousEventsConnection, v: PreviousConnectionView) {
        v.eventName = m.eventName;
        v.date = m.date;
        v.duration = m.duration;
        v.totalonnections = m.total_connections;
        v.mostonnectedDevice = m.most_connected_device;
    }
    
    decompose(v: PreviousConnectionView): Data.PreviousEventsConnection {
        throw('')
    }

    view(): PreviousConnectionView {
        return new PreviousConnectionView()
    }

}