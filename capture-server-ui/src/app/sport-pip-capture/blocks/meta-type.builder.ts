import { Collection } from "app/blocks/collection";
import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "../models/capture-interface";

export class MetaTypeBuilder extends AbstractBuilder<
  Data.MetaType,
  Collection<string>
> {
  view(): Collection<string> {
    return new Collection<string>();
  }
  compose(m: Data.MetaType, v: Collection<string>) {
    m.values.forEach((t) => v.Add(t));
  }
  decompose(v: Collection<string>): Data.MetaType {
    throw new Error("Method not implemented.");
  }
}
