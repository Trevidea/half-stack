import { AbstractBuilder } from "app/blocks/strategies";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ApplicationView } from "../view/application";

export class ApplicationBuilder extends AbstractBuilder<Data.Application, ApplicationView> {
    compose(m: Data.Application, v: ApplicationView) {
        throw new Error("Method not implemented.");
    }
    decompose(v: ApplicationView): Data.Application {
        return {
            id: v.id,
            app_name: v.appName
        }
    }
    view(): ApplicationView {
        return new ApplicationView();
    }
}