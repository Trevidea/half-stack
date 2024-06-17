import { AbstractBuilder } from "app/blocks/strategies";
import { EmailView, SharingView } from "../view/sharing";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { Transformer } from "app/blocks/transformer";

export class ShareBuilder extends AbstractBuilder<Data.Distribution, SharingView> {
    compose(m: Data.Distribution, v: SharingView) {
        console.log(m)
        v.id = m.id;
        v.name = m.name;
        Transformer.ComposeCollection(m?.emails, v?.emails, EmailBuilder)

    }
    decompose(v: SharingView): Data.Distribution {
        return

    }
    view(): SharingView {
        return new SharingView();
    }

}

export class EmailBuilder extends AbstractBuilder<Data.Emails, EmailView> {
    compose(m: Data.Emails, v: EmailView) {
        v.email = m.email;
    }
    decompose(v: EmailView): Data.Emails {
        return

    }
    view(): EmailView {
        return new EmailView();
    }

}