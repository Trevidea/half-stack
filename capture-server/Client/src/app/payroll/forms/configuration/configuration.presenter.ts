import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "src/app/model-service/payroll-interface";
import { ConfigurationBuilder } from "./builders/configuration";
import { ConfigurationView } from "./views/configuration";

@Component({
    selector: 'app-configuration-presenter',
    template: `<app-configuration [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-configuration>`,
    styleUrls: ['./configuration.component.scss']
})

export class ConfigurationPresenter implements OnInit {
    ds!: ConfigurationView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

        this.ds = new ConfigurationView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("configuration", this.ds, dataFactory.SaveConfiguration, ConfigurationBuilder, router);

    }
    ngOnInit(): void {
        if (this.ds.id) {
            Transformer.ComposeObjectAsync(this.dataFactory.ConfigJson(this.ds.id), this.ds, ConfigurationBuilder);
        }
    }

}
