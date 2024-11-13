import { AbstractBuilder } from "src/app/blocks/strategies";
import { TypeView } from "../views/meta-types";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class TypeBuilder implements AbstractBuilder<Data.MetaType, TypeView> {
    compose(m: Data.MetaType, v: TypeView) {
        console.log(v)
        v.id = m.id
        v.key = m.key;
        v.name = m.name;
        v.value = m.values
    }
    decompose(v: TypeView): Data.MetaType {
        throw new Error("Method not implemented.");
    }
    view(): TypeView {
        return new TypeView()
    }


}