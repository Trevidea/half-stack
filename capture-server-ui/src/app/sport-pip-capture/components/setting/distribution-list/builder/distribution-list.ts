import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { DistributionListView, EmailView } from "../view/distribution-list";
import { Transformer } from "app/blocks/transformer";

export class DistributionListBuilder extends AbstractBuilder<Data.Distribution, DistributionListView>{
    compose(m: Data.Distribution, v: DistributionListView) {
        console.log(m)
        v.name = m.name;
        v.id = m.id;
        Transformer.ComposeCollection(m?.emails ,v?.emails ,EmailBuilder)
    }
    decompose(v: DistributionListView): Data.Distribution {
        return {
            id: v.id,
            name: v.name,
            emails: v.emails.map(emailView => ({
                name: emailView.name,
                email: emailView.email
            }))
        }
    }
    view(): DistributionListView {
        return new DistributionListView();
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