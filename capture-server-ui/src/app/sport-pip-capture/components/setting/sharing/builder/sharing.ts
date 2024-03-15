import { AbstractBuilder } from "app/blocks/strategies";
import { EmailView, SharingView } from "../view/sharing";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { Transformer } from "app/blocks/transformer";

export class ShareBuilder extends AbstractBuilder<Data.Distribution, SharingView>{
    compose(m: Data.Distribution, v: SharingView) {
   
        v.id = m.id;
        v.name = m.name;
        // v.emails[0].email = m.emails[0]?.email
        // v.emails[0].name = m.name
        
        Transformer.ComposeCollection(m?.emails ,v?.emails ,EmailBuilder)
        
    }
    decompose(v: SharingView): Data.Distribution {
        return

    }
    view(): SharingView {
        return new SharingView();
    }

}

export class EmailBuilder extends AbstractBuilder<Data.Emails, EmailView>{
    compose(m: Data.Emails, v: EmailView) {
       
        v.email = m.email;
        v.name = m.name
    }
    decompose(v: EmailView): Data.Emails {
        return

    }
    view(): EmailView {
        return new EmailView();
    }

}