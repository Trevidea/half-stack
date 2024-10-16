
import { AbstractBuilder } from "src/app/blocks/strategies";
import { ApplicationView } from "../view/application";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";

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