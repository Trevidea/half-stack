import { Collection } from "src/app/blocks/collection";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "../services/models-interfaces/half-stack-interface";


export class MetaTypeBuilder extends AbstractBuilder<
    Data.MetaType,
    Collection<string>
> {
    view(): Collection<string> {
        return new Collection<string>();
    }
    compose(m: Data.MetaType, v: Collection<string>) {
        JSON.parse(m.values as any).forEach((t) => v.Add(t));
    }
    decompose(v: Collection<string>): Data.MetaType {
        throw new Error("Method not implemented.");
    }
}
