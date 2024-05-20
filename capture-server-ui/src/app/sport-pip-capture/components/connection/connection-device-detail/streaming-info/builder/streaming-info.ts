import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { StreamingInfoView } from "../view/streaming-info";

export class StreamingInfoBuilder extends AbstractBuilder<Data.StreamingInfo, StreamingInfoView> {
    compose(m: Data.StreamingInfo, v: StreamingInfoView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: StreamingInfoView): Data.StreamingInfo {
        throw new Error("Method not implemented.");
    }
    view(): StreamingInfoView {
        throw new Error("Method not implemented.");
    }

}