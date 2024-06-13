import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ConnectionDetailsView } from "../view/connections";

export class PastConnectionBuilder extends AbstractBuilder<Data.PastConnectionDetails, ConnectionDetailsView> {
    compose(m: Data.PastConnectionDetails, v: ConnectionDetailsView) {
        v.sreamName = m.stream_name;
        v.direction = m.direction;
    }
    decompose(v: ConnectionDetailsView): Data.PastConnectionDetails {
        throw new Error("Method not implemented.");
    }
    view(): ConnectionDetailsView {
        return new ConnectionDetailsView();
    }

}