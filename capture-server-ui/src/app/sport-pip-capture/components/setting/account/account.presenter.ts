import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountView } from "./views/account-view";
import { Transformer } from "app/blocks/transformer";
import { AccountBuilder } from "./builder/account";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { PresenterAction } from "app/blocks/actions";
import { Router } from "@angular/router";

@Component({
    selector: 'app-account-presenter',
    template: `<app-account [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-account>`,
    styleUrls: ['./account.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountPresenter implements OnInit {
    ds!: AccountView;
    actions!: Views.FormActions;
    constructor(private dataFactory: DataFactoryService, router: Router) {
        this.ds = new AccountView()
        this.ds.id = 1;
        this.actions = new PresenterAction("settings/account", this.ds, dataFactory.SaveUserProfileJson, AccountBuilder, router);

    }
    ngOnInit(): void {
        // Transformer.ComposeObjectAsync(this.dataFactory.UserProfileJson(this.ds.id), this.ds, AccountBuilder)
    }

}
