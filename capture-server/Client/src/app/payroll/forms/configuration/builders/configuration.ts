import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { ConfigurationView } from "../views/configuration";

export class ConfigurationBuilder implements AbstractBuilder<Data.Configuration, ConfigurationView>
{
    compose(m: Data.Configuration, v: ConfigurationView) {
        v.id = m.id
        v.key = m.key
        v.value = m.value
    }
    decompose(v: ConfigurationView): Data.Configuration {
        return {
            id: v.id,
            key: v.key,
            value: v.value
        }
    }
    view(): ConfigurationView {
        return new ConfigurationView();
    }

}