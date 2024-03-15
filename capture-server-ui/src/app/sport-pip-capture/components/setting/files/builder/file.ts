

import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/sport-pip-capture-interface";
import { FileView } from "../view/file";


export class FileBuilder extends AbstractBuilder<Data.FileIndex, FileView>{
    compose(m: Data.FileIndex, v: FileView) {
        v.fileName = m.name;
        v.date = m.dtCreated;
        v.id = m.id;
        v.size = m.size;
    }
    decompose(v: FileView): Data.FileIndex {
        throw new Error("Method not implemented.");
    }
    view(): FileView {
        return new FileView();
    }

}
