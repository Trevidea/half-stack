import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { EventUploadAuthView } from "../view/event-upload-auth";

export class EventUploadAuth extends AbstractBuilder<Data.EventUploadAuth, EventUploadAuthView> {
    compose(m: Data.EventUploadAuth, v: EventUploadAuthView) {

    }
    decompose(v: EventUploadAuthView): Data.EventUploadAuth {
        return {
            id: v.id,
            username: v.userName,
            password: v.password,
            server_identity: v.serverIdentity
        }
    }
    view(): EventUploadAuthView {
        return new EventUploadAuthView();
    }

}