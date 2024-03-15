import { Collection } from "../blocks/collection";
import { AbstractBuilder } from "../blocks/strategies";
import { Data } from "./payroll-interface";





export class MetaTypeBuilder extends AbstractBuilder<Data.MetaType, Collection<string>>
{
    view(): Collection<string> {
        return new Collection<string>();
    }
    compose(m: Data.MetaType, v: Collection<string>) {
        m['Gateway Response'].result[0].forEach( (async metaType=>{
            if(metaType.field == 'values'){
                let arr = [];
                arr= await JSON.parse(metaType.value)
                arr.forEach(m => v.Add(m))
            }
        }))
    }
    decompose(v: Collection<string>): Data.MetaType {
        throw new Error("Method not implemented.");
    }
}