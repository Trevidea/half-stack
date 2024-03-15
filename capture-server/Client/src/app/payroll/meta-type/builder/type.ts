import { AbstractBuilder } from "src/app/blocks/strategies";
import { TypeView } from "../views/meta-type";
import { Data } from "src/app/model-service/payroll-interface";
import { MetaTypeModel } from "src/app/model-service/meta-type";







export class TypeBuilder implements AbstractBuilder<MetaTypeModel, TypeView>{
    compose(m: MetaTypeModel, v: TypeView) {
        console.log(v)
        v.id=m.id
        v.key = m.key;
        v.name = m.name;
        v.value = m.values
    }
    decompose(v: TypeView): MetaTypeModel {
        throw new Error("Method not implemented.");
    }
    view(): TypeView {
        return new TypeView()
    }


}