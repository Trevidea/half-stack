import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { TypesView } from "../views/types";
import { AbstractBuilder } from "app/blocks/strategies";



export class TypesEgressBuilder extends AbstractBuilder<Data.MetaTypeEgress, TypesView>
{
    compose(m: Data.MetaTypeEgress, v: TypesView) {
        throw new Error("Method not implemented.");
    }
    view(): TypesView {
        throw new Error("Method not implemented.");
    }
    decompose(v: TypesView): Data.MetaTypeEgress {
         const values = v.existingTypes.concat([v.newType]);
         return {
            id: v.id,
            values: values,
            newItem: v.newType
         }
    }

}