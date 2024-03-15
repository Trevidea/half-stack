import { Data } from "src/app/model-service/payroll-interface";
import { MetaTypeView } from "../views/meta-type";
import { AbstractBuilder } from "src/app/blocks/strategies";




export class MetaTypeBuilder implements AbstractBuilder<Data.MetaType, MetaTypeView>{
    compose(m: Data.MetaType, v: MetaTypeView) {
        console.log(m)
        v.id = m.id
        v.key = m.key;
        v.name = m.name;
        v.value = m.values
    }
    decompose(v: MetaTypeView): Data.MetaType {
        return {
            id: v.id,
            name: v.name,
            key: v.key,
            values: v.value
        }
    }
    view(): MetaTypeView {
        return new MetaTypeView()
    }


}