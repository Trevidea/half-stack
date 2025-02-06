
import { AbstractBuilder } from "src/app/blocks/strategies";
import { MetaTypeView } from "../views/meta-types";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

export class MetaTypeBuilder extends AbstractBuilder<
  Data.MetaType,
  MetaTypeView
> {
  view(): MetaTypeView {
    return new MetaTypeView();
  }
  compose(m: Data.MetaType, v: MetaTypeView) {
    v.id = m.id;
    v.value = m.values;
    v.key = m.key;
    v.name = m.name;
  }
  decompose(v: MetaTypeView): Data.MetaType {
    return {
      id: v.id,
      key: v.key,
      values: v.value,
      name: v.name,
    };
  }
}
