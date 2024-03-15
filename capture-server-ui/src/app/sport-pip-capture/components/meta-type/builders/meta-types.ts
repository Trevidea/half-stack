import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { MetatypeView } from "../views/meta-types";



export class MetaTypeBuilder extends AbstractBuilder<Data.MetaType, MetatypeView>
{
    view(): MetatypeView {
        return new MetatypeView();
    }
    compose(m: Data.MetaType, v: MetatypeView) {
        v.id = m.id;
        v.values = m.values
        v.key = m.key;
        v.name = m.name
    }
    decompose(v: MetatypeView): Data.MetaType {
        return {
            id: v.id,
            key: v.key,
            values: v.values,
            name: v.name
        }
    }
}