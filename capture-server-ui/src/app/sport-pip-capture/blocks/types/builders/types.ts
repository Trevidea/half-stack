import { Data } from "app/sport-pip-capture/models/capture-interface";
import { TypesView } from "../views/types";
import { AbstractBuilder } from "app/blocks/strategies";

export class TypesBuilder extends AbstractBuilder<Data.MetaType, TypesView> {
  compose(m: Data.MetaType, v: TypesView) {
    v.id = m.id;
    v.typeName = m.name;
    v.existingTypes = m.values;
    v.key = m.key;
  }
  decompose(v: TypesView): Data.MetaType {
    const values = v.existingTypes.concat([v.newType]);
    console.log("types :::", values);
    return {
      id: v.id,
      key: v.key,
      name: v.typeName,
      values: values,
    };
  }
  view(): TypesView {
    return new TypesView();
  }
}
